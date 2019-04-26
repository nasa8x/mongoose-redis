
var mongoose = require('mongoose'),
    mongooseCache = require('./src')(mongoose, "redis://127.0.0.1:6379"),
    Member = require("./member");

mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });


(async () => {

    var result = await Member.findById("5aed385ea125950ff789614a").cache(60);
    console.log(result);

})();