let mongoose = require('mongoose')
let validator = require('validator')
const timestampPlugin = require('./../plugins/timestamp');
const duplicatePlugin = require('./../plugins/duplicate');

let notificationSchema = new mongoose.Schema({
    userID: String,
    text: String,
});

notificationSchema.plugin(timestampPlugin);

module.exports = mongoose.model('Notification', notificationSchema);