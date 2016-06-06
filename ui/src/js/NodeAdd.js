React.createClass(
  render: () => {
    return(
      <div>
        <form>
          Address:<br>
          <input type="text" name="address">
          <br>
          Username:<br>
          <input type="text" name="username">
          Password:<br>
          <input type="password" name="password">
        </form>
      </div>
    );
  }
);
