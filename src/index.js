const Hash = require("mix-hash"),
    redis = require("redis"),
    util = require("util");

module.exports = function (mongoose, option) {
    var exec = mongoose.Query.prototype.exec;
    // var execFind = mongoose.Query.prototype.execFind;
    // const aggregate = mongoose.Model.aggregate;
    var client = redis.createClient(option || "redis://127.0.0.1:6379");
    client.get = util.promisify(client.get);

    mongoose.Query.prototype.cache = function (ttl, customKey) {
        if (typeof ttl === 'string') {
            customKey = ttl;
            ttl = 60;
        }

        this._ttl = ttl;
        this._key = customKey;
        return this;
    }

    mongoose.Query.prototype.exec = async function () {
        if (!this._ttl) {            
            return exec.apply(this, arguments);
        }
        const key = this._key || Hash.md5(JSON.stringify(Object.assign({}, { name: this.model.collection.name, conditions: this._conditions, fields: this._fields, o: this.options })));

        const cached = await client.get(key);
        if (cached) {
            // console.log(`[LOG] Serving from cache`);
            const doc = JSON.parse(cached);
            return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
        }

        const result = await exec.apply(this, arguments);
        if (result) {
            client.set(key, JSON.stringify(result), "EX", this._ttl);
        }
        return result;
    }
   
}