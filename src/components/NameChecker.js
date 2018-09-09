import React, { Component } from 'react';
import web3 from './../web3';
import axios from 'axios';
import Emoji from './Emoji';
import languageImage from  './../language.png';
import GameCard from './GameCard';


const games = [
    {
        name : "Threee Week Mission",
        participants : 10,
        fontSize : '16px',
        eth : 1.4,
        ends : "10/11/2018"
    },
    {
        name : "In it for the winnings",
        participants : 50,
        fontSize : '20px',
        eth : 5.89,
        ends : "27/11/2018"
    },
    {
        name : "One week wonder",
        participants : 15,
        fontSize : '20px',
        eth : 0.8,
        ends : "27/09/2018"
    }
]

class NameChecker extends Component {

    constructor(props) {
        super(props);
        this.state = { gameName: "no game name!" };
        this.state = { matchingNames: false }
    }

    checkUsernameOnDuo() {
        axios.get(`http://www.duolingo.com/users/${this.state.gameName}`).then((response) => {
            //no way to prevent redirects from client with axios - makes error handling difficult
            if (response.status === 200) {
                console.log("correct name", response)
                this.setState({
                    matchingNames: true
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        if (web3) {
            web3.eth.getAccounts().then((userWeb3) => {
                this.setState({
                    gameName: userWeb3[0].substring(26, 42)
                }, () => {
                    axios.get(`http://www.duolingo.com/users/${this.state.gameName}`).then((response) => {
                        //no way to prevent redirects from client with axios - makes error handling difficult
                        if (response.status === 200) {
                            console.log("correct name", response)
                            this.setState({
                                matchingNames: true
                            })
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                });
            })
        }
    }

    render() {
        return <div>
            <img src={languageImage} style={{width : '400px'}}/>
            <h1>DuoLingo Challenge</h1>
            {!this.state.matchingNames &&
                <div>
                    <p> Please change your DuoLingo username to: </p>
                    <div>
                        <p style={{ backgroundColor: "#f7f7f9", padding: "15px", maxWidth: 200, margin: 'auto', borderRadius: 4 }}>{this.state.gameName}</p>
                    </div>
                    <button style={{ margin: "10px" }} type="button" className="btn btn-primary" onClick={this.checkUsernameOnDuo.bind(this)}>Done</button>
                </div>
            }
            {this.state.matchingNames &&
                <div>
                    <p> <Emoji symbol="✅" /> Your name matches your public key </p>
                    <div className="container" style={{marginTop : '10%'}}>
                        <div className="row">
                            {games.map((game, i)=>(<GameCard key={i} game={game}/>))}
                        </div>
                    </div>
                    <button style={{ margin: "10px" }} type="button" className="btn btn-primary" onClick={() => (null)}>Create</button>
                </div>
            }
        </div>
    }
}

export default NameChecker;