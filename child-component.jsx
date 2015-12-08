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