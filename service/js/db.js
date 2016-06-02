'use strict';

const DB_INIT_SQL_FILE = './db/init.sql';
const DB_CONFIG_FILE = '../db/config.json';
var fs = require('fs');
var pg = require('pg');
var Promise = require('promise');
var dbConfig = require(DB_CONFIG_FILE);
var DB_CON = "postgres://" + dbConfig.user + ":" + dbConfig.password + "@" + dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.database;
var client;

exports.init = init;
exports.textQuery = textQuery;

function init() {
  var promise = new Promise((resolve, reject) => {
    var sql = fs.readFileSync(DB_INIT_SQL_FILE).toString();
    textQuery(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
}

/**
 * Plain text queries, for a single query instance, are faster and the most flexible. 
 * They are also the most insecure, providing no barrier to SQL injection attacks.
 */
function textQuery(sql, callback) {
  pg.connect(DB_CON, (err, client, done) => {
    
    // Define a error handler.
    var errHandler = function (err) {
      if (!err) {
        return false;
      }
      if (client) {
        done(client);
      }
      return true;
    };

    if (errHandler(err)) {
      callback(err, null);
      return;
    }

    client.query(sql, (err, result) => {
      // return the client to the pool.
      done();
      errHandler(err);
      callback(err, result);
    });
  });

}
