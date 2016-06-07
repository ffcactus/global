var db = require('./db');
var Promise = require('promise');

// APIs about section table.
exports.createSection = createSection;
exports.getSectionIdByName = getSectionIdByName;
exports.updateSection = updateSection;
exports.deleteSection = deleteSection;
exports.getRootSectionId = getRootSectionId;

// APIs about section section table.
exports.createSectionSection = createSectionSection;
exports.deleteSectionSection = deleteSectionSection;
exports.getAllSectionSection = getAllSectionSection;


/**
 * Create the section.
 * 
 */
function createSection(section) {
  // TODO:
  // Check the integration of section object.
  var sql = "insert into section(name) values('" + section.name + "');";
  return _getPromiseOfSql(sql, null);
}

/**
 * Get the section ID by name.
 * 
 */
function getSectionIdByName(name) {
  if (!name) {
    return new Promise((resolve, reject) => {
      reject("Can't get ID without a name.");
    });
  }

  var sql = "select id from section where name='" + name + "';";
  return _getPromiseOfSql(sql, null);
}

/**
 * Update section by ID.
 * 
 */
function updateSection(id, section) {
  // TODO:
  // Check the integration of section object.  
  if (!id) {
    return new Promise((resolve, reject) => {
      reject("Can't update section without ID.");
    });
  }
  
  var sql = "update section set value name='" + section.name + "' where id='" + id + "';";
  return _getPromiseOfSql(sql, null);
}

/**
 * Delete section by ID.
 * 
 */
function deleteSection(id) {
  if (!id) {
    return new Promise((resolve, reject) => {
      reject("Can't remove section without ID.");
    });
  }

  var sql = "delete from section where id='" + id + "';";
  return _getPromiseOfSql(sql, null);
}

/**
 * Create the section section relationship.
 * 
 */
function createSectionSection(parentId, childId) {
  if (!childId) {
    return new Promise((resolve, reject) => {
      reject("Can't create section section with child = null.");
    });
  }
  
  var sql = "insert into section_section(parent, child) values(" + parentId + "," + childId + ");";
  return _getPromiseOfSql(sql, null);
}

/**
 * Delete the section section relationship.
 * If the child has children, you can't delete the relationship.
 * 
 */
function deleteSectionSection(parentId, childId) {
  if (! childId) {
    return new Promise((resolve, reject) => {
      reject("Can't remove section section with child = null.");
    });
  }
  
  var getChildren = getChildrenIdBySectionId(childId);
  var retPromise = getChildren.then((children) => {
    if(children.lenght !== 0) {
      return new Promise((resolve, reject) => {
        reject("Can't remove section section if the child section have children.");
      });
    } else {
      var sql = "delete into section_section where parent='" + parentId + "',child='" + childId + "';";
      return _getPromiseOfSql(sql, null);
    }
  });
  
  return retPromise;
}

/**
 * Get the root section.
 * The name of the root section is null.
 * 
 */
function getRootSectionId() {  
  var sql = "select id from section where name is null";
  return _getPromiseOfSql(sql, (result) => {
    return result.rows[0].id;
  });
}

/**
 * Give the ID of a section, return it's children.
 * 
 */
function getChildrenIdBySectionId(id) {  
  var sql = "select id from section_section where parent='" + id + "';";
  return _getPromiseOfSql(sql, (result) => {
    return result.rows.map((eachRow) => {
      return eachRow.id;
    });
  });
}

/**
 * Get all the section section relationship.
 * 
 */
function getAllSectionSection() {
  var promise = new Promise((resolve, reject) => {
    var sql = "select * from section_section;";
    db.textQuery(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        var ret = [];
        result.rows.map((eachRow) => {
          ret.push({
            "parent": eachRow.parent,
            "child": eachRow.child
          });
        });
        resolve(ret);
      }
    });
  });
  return promise;
  
  var sql = "select * from section_section;";
  return _getPromiseOfSql(sql, (result) => {
    result.rows.map((eachRow) => {
      return {
        "parent": eachRow.parent,
        "child": eachRow.child
      };
    });
  });
}

/**
 * Execute the SQL command and return the result.
 * @ transformRawResult if provide, it will be used to transform the raw
 * SQL result.
 */
function _getPromiseOfSql(sql, transformRawResult) {
  if (!sql) {
    console.error("Unable to get Promise of 'SQL = null.'");
    return null;
  }
  var promise = new Promise((resolve, reject) => {
    db.textQuery(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(transformRawResult ? transformRawResult(result) : result);
      }
    });
  });
  return promise;
}

