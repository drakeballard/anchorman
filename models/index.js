'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
// var config    = require(__dirname + '/../config/config.json')[env];
var db = {};

// config.use_env_variable

if (true) {
  console.log('using production env');
  console.log(config);
  console.log(process.env["JawsDB_URL"]);
    var sequelize = new Sequelize("mysql://kom08p8cjiyb56h0:cub9two8ohpt7adh@tkck4yllxdrw0bhi.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/bvnr602qmk6zvft2");
} else {
  console.log('using local env');
    var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function(file) {
        var model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
