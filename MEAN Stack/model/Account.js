var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , LocalStrategy = require('passport-local').Strategy
  , passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new Schema({ });

accountSchema.plugin(passportLocalMongoose);

exports.accountModel = mongoose.model('Account', accountSchema);