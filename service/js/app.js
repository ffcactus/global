'use strict';

var express = require('express');
var db = require('./db');
var section = require('./section');
var Promise = require('promise');

function createSection(name) {
  var promise = new Promise((resolve, reject) => {
    section.createSection({
      "name": name
    }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
}

function createSectionSection(parentId, childId) {
  var promise = new Promise((resolve, reject) => {
    section.createSectionSection(parentId, childId, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
}

function getSectionIdByName(name) {
  var promise = new Promise((resolve, reject) => {
    section.getIdByName(name, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
}

function main() { 
  var init = db.init();
  var createHpe = init.then(() => {
    return createSection("HPE");
  }, (reject) => {
    console.error({ reject });
  });

  var createEg = init.then(() => {
    return createSection("EG");
  }, (reject) => {
    console.error({ reject });
  });

  var hpeId = createHpe.then(() => {
    return getSectionIdByName("HPE");
  }, (reject) => {
    console.error({ reject });
  });

  var egId = createEg.then(() => {
    return getSectionIdByName("EG");
  });

  var linkHpeEg = Promise.all([hpeId, egId]).then((values) => {
    return createSectionSection(values[0].rows[0].id, values[1].rows[0].id);
  }, (reject) => {
    console.error({ reject });
  });

  linkHpeEg.then((fulfill) => {
    console.info('done');
  }, (reject) => {
    console.error({ reject });
  });
}




main();
