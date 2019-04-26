Mongoose Cache: Integrated Redis caching for Mongoose queries.

Best Performance Mongoose caching module that works exactly how you would expect it to, with the latest version of Mongoose.

# Installation

Install via NPM

```js
npm install mongoose-redis --save
```


# Example

```js

var mongoose = require('mongoose');
var MongooseCache = require('mongoose-redis');

```
Config mongoose-redis cache
```js

var cache = MongooseCache(mongoose, {port: 6379, host: 'localhost'});

```
Config with `compress`, with this configuration, the data will be `compressed` before saving on Redis
```js

var cache = MongooseCache(mongoose, {port: 6379, host: 'localhost', compress: true});

```

```js

Post.find({ stt: 1 }).sort({ crt: -1 })
.limit(30)
.cache(120) // cache 120 seconds
.select({ tl: 1, lth:1, views:1, img: 1, slug: 1})
.exec(function(err, docs) {
  // do something
});

```
You can also pass a custom key into the .cache() method, which you can then use later to clear the cached content.

```js

app.get('/detail/:id', function(req, res) {
    var _id = req.params.id;  
      Post.findOne({ slug: _id, stt: 1 })
            .cache(120, _id) // custom cache key by id
            .exec(function(err, doc) {
              return res.render("info", { info: doc, title: doc.tl, image: doc.img, description: doc.desc });
            });       
});

```

Continue updating...
