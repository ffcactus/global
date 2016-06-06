var PopDiv = React.createClass({
  render: () => {
    return (
      <div className="white_content">
        <h1>This is a pop div</h1>
        <p>Hello World!</p>
      </div>
    );
  }
});

ReactDOM.render(
  <PopDiv />,
  document.getElementById('container')
);
