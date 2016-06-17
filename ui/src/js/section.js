var sectionTree = {
  "name": "root",
  "id": "id_0001",
  "children": [
    {
      "name": "folder0",
      "id": "id_0002",
      "children": [
        {
          "name": "folder1",
          "id": "id_0003",
          "children": []
        },
        {
          "name": "folder2",
          "id": "id_0004",
          "children": [
            {
              "name": "folder3",
              "id": "id_0005",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "folder4",
      "id": "id_0006",
      "children": [
        {
          "name": "folder5",
          "id": "id_0007",
          "children": []
        },
        {
          "name": "folder2",
          "id": "id_0008",
          "children": [
            {
              "name": "folder3",
              "id": "id_0009",
              "children": []
            }
          ]
        }
      ]
    }
  ]
}


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

ReactDOM.render(
  <SectionTree sectionTree={sectionTree}/>,
  document.getElementById("container")
);
