
var mongoose = require('mongoose'),
    mongooseCache = require('./src')(mongoose, "redis://127.0.0.1:6379"),
    Member = require("./member");

mongoose.connect("mongodb://localhost/morioh", { useNewUrlParser: true, useUnifiedTopology: true });


(async () => {

    // var result = await Member.findById("5da3dd647278842173de8ef2").cache(60);
    // console.log(result);

    // Member.findById("5dbfac4d7d3ff31acb86d870").cache(60).then(result => {
    //     console.log(result);
    // });

    Member.findOne({ _id: '5dbfac4d7d3ff31acb86d870' }).cache(60).then(result => {
        console.log(result);
    });

    // Member.findOne({ _id: '5dbfac4d7d3ff31acb86d870' }, (err, doc) => {
    //     console.log(doc);
    // }).cache(60, '5dbfac4d7d3ff31acb86d870');
    // console.log(result);

})();