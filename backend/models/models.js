const mongoose = require("mongoose")
const crypto = require("crypto")


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String
})

UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex")    
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString("hex")
}

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString("hex")
    return this.hash === hash
}

const User = mongoose.model("user", UserSchema)

module.exports = {User}

