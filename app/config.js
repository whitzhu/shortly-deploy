var path = require('path');
var mongoose = require('mongoose');
var Promise = require('bluebird');

mongoose.connect('mongodb://localhost/shortly');
var db = mongoose.connection;

Promise.promisifyAll(mongoose);

db.on('error', console.error.bind(console, 'connection error:'));

db.onceAsync('open')
  .then(function() {
    console.log('We are connected');
  });

var Schema = mongoose.Schema;

var urlSchema = new Schema({
  // _id: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String, 
  visits: { type: Number, default: 0},
  timestamp: { type: Date, default: Date.now }
});

var usersSchema = new Schema({
  // _id: Number,
  username: {type: String, unique: true},
  password: String,
  timestamp: { type: Date, default: Date.now }
});

var User = mongoose.model('User', usersSchema);
var Link = mongoose.model('Link', urlSchema);

// Link.createAsync({url: 'www.google.com', baseUrl: null, code: null, title: null, visits: 0})
//   .then(function(err) {
//     console.log('added!');
//   });
// var user1 = new User();
// console.log('===========user1 is', user1);
// User.create({_id: null, username: 'Brandon2', password: 'mango'}, function(err, user1) {
//   if (err) {
//     console.log('error: ', err);
//   } else {

//     console.log('saved!');
//     console.log('user: ', user1);
//   }
// });
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = {
  db: db,
  Link: Link,
  User: User
};
