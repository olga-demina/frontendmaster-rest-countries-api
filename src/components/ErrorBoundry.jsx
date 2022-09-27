import { Component } from "react";

class ErrorBoundry extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        this.setState({hasError: true});
    }

    render() {
        if (this.state.hasError) {
            return <h2>Oooops... an error occured!</h2>            
        }
        return this.props.children;
    }
}

export default ErrorBoundry;