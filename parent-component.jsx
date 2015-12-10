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
		
	components() {
		return Components.find().map(c => <ChildComponent key={c._id} component={c} />);
	},

    render() {
        return (
            <div>
				<h1>PARENT COMPONENT TITLE: {this.state.title}</h1>

				{this.components()}

				<button className="add-component">ADD COMPONENT</button>
            </div>
        );
    }
});

Components = new Mongo.Collection(null);