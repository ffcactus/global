-- id should be INTEGER NOT NULL PRIMARY KEY
-- name should be varchar(256)
-- URL style expression should be varchar(512)

-- Section is a collection. It contains other sub sections or node.

DROP table section, section_section, node, node_section;

CREATE TABLE IF NOT EXISTS section(
  id SERIAL PRIMARY KEY,
  name varchar(256)
);

-- The relationship among the sections. We assume it's a tree style.
CREATE TABLE IF NOT EXISTS section_section(
  parent INTEGER REFERENCES Section (id),
  child INTEGER NOT NULL REFERENCES Section (id),
  PRIMARY KEY (parent, child)
);

-- Node is target that provider API to retrieve it's managed resources, for example OneView appliance. 
CREATE TABLE IF NOT EXISTS node(
  id SERIAL NOT NULL PRIMARY KEY,
  name varchar(256),
  address varchar(512),
  type varchar(64)
);

CREATE TABLE IF NOT EXISTS node_section(
  node_id INTEGER NOT NULL REFERENCES node (id),
  section_id INTEGER NOT NULL REFERENCES section (id),
  PRIMARY KEY (node_id, section_id)
);





