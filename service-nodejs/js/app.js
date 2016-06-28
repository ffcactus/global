'use strict';

var express = require('express');
var db = require('./db');
var status = require('./status');
var section = require('./section');
var Promise = require('promise');

function main() { 
  
  status.setHealth(status.HEALTH_NORMAL);
  status.setLifeCycle(status.LIFE_CYCLE_INIT);
  
  // Initialize DB.
  db.init().then((value) => {
    console.info("DB initialization finished.");
    
  }, (reason) => {
    console.error("DB initialization failed.");
    status.setHealth(status.HEALTH_CRITICAL);
    status.setMessage("DB initialization failed.");
  });
  
}




main();
