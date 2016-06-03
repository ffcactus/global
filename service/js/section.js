var db = require('./db');
var Promise = require('promise');

exports.createSection = createSection;
exports.getIdByName = getIdByName;
exports.createSectionSection = createSectionSection;

function createSection(section, callback) {
  if(section.name) {
    var sql = "insert into section(name) values('" + section.name + "');";
    console.info({sql});
    db.textQuery(sql, callback);
  } else {
    console.error("Can't fine name in section object.", {section});
  }    
}

function getIdByName(name, callback) {
  if(name) {
    var sql = "select id from section where name='" + name + "';";
    console.info({sql});
    db.textQuery(sql, callback);
  } else {
    console.error("Can't get ID without a name.", {name});
  }
}

function createSectionSection(parentId, childId, callback) {
  if(! childId) {
    console.error("Can't create section relation ship with child = null.");
    return;
  }
  var sql = "insert into section_section(parent, child) values(" + parentId + "," + childId + ");";
  console.info({sql});
  db.textQuery(sql, callback);
}


function getRootId() {
  var promise = new Promise((resolve, reject) => {
    var sql = "select id from section where name is null";
    db.textQuery(sql, (err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve(result.rows[0].id);
      }
    });
  });
  return promise;
}

function getChildrenIdByParentId(id) {
  var promise = new Promise((resolve, reject) => {
    var sql = "select id from section_section where parent='" + id + "';";
    db.textQuery(sql, (err, result) => {
      if(err) {
        reject(err);
      } else {
        resolve(result.rows.map((row) => {
          return row.id;
        }));
      }
    });
  });
  return promise;
}

function getSectionTree() {
  var rootId = getRootId();
  var children = rootId.then((id) => {
    return getChildrenIdByParentId(id);
  });
  
  return rootId; 
}
