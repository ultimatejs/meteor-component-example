if (Meteor.isClient) {
  Meteor.startup(function () {
    let node = document.createElement('div');    
    node.setAttribute('id', 'render-target');                   
	document.body.appendChild(node); //dont send Blaze, Spacebars, etc to the client                            

    ReactDOM.render(<ParentComponent />, node);
  });
}