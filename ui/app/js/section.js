import React from 'react';

var SectionTree = React.createClass({

  getDefaultProps: function() {
    return ({
      "defaultOpen": false,
      "checkboxIdPrefix": "section-checkbox-"
    });
  },

  getInitialState: function() {
    return {
      folderOpenRecords: {}
    }
  },

  onFolderClick: function(event) {
    var id = event.target.id.substring(this.props.checkboxIdPrefix.length);
    var open = this.isFolderOpen(id);
    this.state.folderOpenRecords[id] = !open;
    this.setState({
      folderOpenRecords : this.state.folderOpenRecords
    });
  },

  isFolderOpen(id) {
    if (this.state.folderOpenRecords.hasOwnProperty(id)) {
      return this.state.folderOpenRecords[id];
    } else {
      return this.props.defaultOpen;
    }
  },

  makeNode: function(sectionTree) {
    var subSection = this.isFolderOpen(sectionTree.id) ?
      sectionTree.children.map(function(each) {
        return this.makeNode(each);
      }, this) : "";

    return (
      <ul key={sectionTree.id}>
        <li>
          <input type="checkbox" id={this.props.checkboxIdPrefix + sectionTree.id} onClick={this.onFolderClick}/>
          <label htmlFor={sectionTree.id}>{sectionTree.name}</label>
          {subSection}
        </li>
      </ul>
    );
  },

  render: function() {
    return (this.makeNode(this.props.sectionTree));
  }
});

export default SectionTree;
