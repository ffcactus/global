var Node = React.createClass({
  render: function() {
    return (
      <h2>{this.props.address}</h2>
    );
  }
});

var NodeList = React.createClass({

  getInitialState: function() {
      return {data: []};
  },

  render: function() {
    var nodes = this.state.data.map(function(eachNode) {
      return (
        <Node address={eachNode.address} key={eachNode.id}>
        </Node>
      );
    });

    return (
      <div>
        {nodes}
      </div>
    );
  }
});

var nodeList = [
  {
    id: 1,
    address: "OneView 1.0"
  },
  {
    id: 2,
    address: "OneView 2.0"
  },
  {
    id: 3,
    address: "OneView 3.0"
  }
];

ReactDOM.render(
  <NodeList data={nodeList}/>,
  document.getElementById('container')
);
