import React, { Component } from 'react';
import web3 from './../web3';

class NameChecker extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { gameName: "no game name!" };
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (web3) {
            web3.eth.getAccounts().then((userWeb3) => {
                console.log('userWeb3', userWeb3)
                this.setState({
                    gameName: userWeb3[0].substring(26, 42)
                });
            })
        }
    }

    render() {
        return <div>
            <h1> Name Checker </h1>
            {this.state.gameName}
        </div>
    }
}

export default NameChecker;