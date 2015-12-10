## Example of the `TrackerReact` mixin in action

To test it out, run the following:

```
git clone https://github.com/ultimatejs/tracker-react-todos-example.git
cd tracker-react-todos-example
meteor
```

Here is a simplified example of the noteworthy code in this repo (check `app.jsx` for the in depth version):

```
ParentComponent = React.createClass({
    mixins: [EventSelector, HelperLookup, TrackerReact],

	getInitialState() {
		return {title: 'n/a'};
	},
	
    title() {
        let parentTitle = this.state.title;
		let childName = this.props.component.name;
				
        return `${parentTitle} > ${childName}`;
    },

    'click a.set-title'() {
        let titles = prompt('Change the title of the parent component, so you can see its state and instance context used by child components. If you use a comma, you can also rename this component--like this: "parent title, child name". This demonstrates accessing both child props and parent state in one method!');
        let parts = titles.split(',');
		let parentTitle = parts[0];
		let childName = parts[1];
		
		if(parentTitle) this.setState({title: parentTitle});
		if(childName) Components.update(this.props.component._id, {$set: {name: childName}});
    },
		
	'click button.add-component'() {
		let name = prompt('name your component');
		if(name) Components.insert({name: name});
	},
		
    render() {
        return (
            <div>
				<h1>PARENT COMPONENT TITLE: {this.state.title}</h1>
		
				{Components.find().map((c) => {
					return <ChildComponent key={c._id} component={c} />;
				})}
				
				<button className="add-component">ADD COMPONENT</button>
            </div>
        );
    }
});


ChildComponent = React.createClass({
    mixins: [EventSelector, HelperLookup, TrackerReact],

    render() {
        return (
            <div>
                <h1>My title is: {this.title()} - <a className="set-title" href="#">SET TITLE</a></h1>
            </div>
        );
    }
});
```

Please test and find issues. Pull requests, welcome. To add the `TrackerReact` mixin to another project, run:

```
meteor add ultimatejs:tracker-react
``` 

ADDITIONAL INFO: `TrackerReact` was birthed out of [**Sideburns**](https://github.com/timbrandin/blaze-react). The goal of `TrackerReact` is to solved dynamic runtime needs that can't be solved at transpilation time. To learn more about it, checkout: https://github.com/ultimatejs/tracker-react