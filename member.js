var mongoose = require("mongoose");

module.exports = mongoose.model("member", new mongoose.Schema(
    {
        mail: {
            type: String,
            index: true,
            unique: true
        },
        //username
        uid: String,
        // password
        pwd: String,
        // first name
        fn: String,
        // last name
        ln: String,

        // 2fa secret 
        fa: String,
        // status
        stt: String,
        // avata 
        avt: String,
        // picture cover
        cv: String,
        // description info
        bio: String,

        crt: { type: Number, default: Date.now }

    }, { collection: "members" })
);
