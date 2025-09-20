const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    subId: { type: String, default: null },
    subEndDate: { type: Number, default: null },
    profile_image: { type: String, default: null },
    bio: { type: String, default: null },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }]
});

const Account = mongoose.model("Account", accountSchema, "Account");
module.exports = Account;
