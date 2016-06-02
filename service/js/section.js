var db = require('./db');

exports.createSection = createSection;
exports.getIdByName = getIdByName;
exports.createSectionSection = createSectionSection;

function createSection(section, callback) {
  if(section.name) {
    var sql = "insert into section(name) values('" + section.name + "');";
    db.textQuery(sql, callback);
  } else {
    console.error("Can't fine name in section object.", {section});
  }    
}

function getIdByName(name, callback) {
  if(name) {
    var sql = "select id from section where name='" + name + "';";
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
  db.textQuery(sql, callback);
}
