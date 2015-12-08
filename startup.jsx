if (Meteor.isClient) {
  Meteor.startup(function () {
    ReactDOM.render(<ParentComponent />, document.getElementById("render-target"));
  });
}