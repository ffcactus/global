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
      if(err) {
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
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
  return promise;
}

function main() {
  // var idHpe, idEg;
  // db.init().then(
  //   createSection("HPE")  
  // ).then(
  //   createSection("EG")
  // ).then(
  //   getSectionIdByName("HPE")
  // ).then((result) => {
  //   idHpe = result.row[0];
  // }).then(
  //   getSectionIdByName("EG")
  // ).then((result) => {
  //   idEg = result.row[0]; 
  // }).then(
  //   createSectionSection(null, idHpe)
  // ).then(
  //   createSectionSection(idHpe, idEg)
  // ).then((result) => {
  //   console.info("Done.", {result}); 
  // });
  
  var step1 = db.init().then(
    createSection("HPE")
  ).then(
    createSection("EG")
  );
  var step2 = step1.then(getSectionIdByName("HPE"));
  var step3 = step1.then(getSectionIdByName("EG"));
  
  var step4 = Promise.all([step1, step2, step3]).then((result) => {
    console.info({result});  
  });
  
  step4.then((result) => {
    console.info("step4 done");
  });
}

main();
