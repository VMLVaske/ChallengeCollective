import React, { Component } from 'react';
import user from './../user.png'

class GameCard extends Component {
    render() {
        const {name, participants, eth, ends, fontSize} = this.props.game;
        const ethVisual = eth * 10
        return (
            <div className="col-sm">
                <div className="card" style={{margin : '10px'}}>
                    <div className="card-body">
                        <h2 className="card-title" style={{fontWeight : 'bold'}}>{name}</h2>
                        <div style={{paddingTop:"40px", paddingBottom: '40px'}}>
                            <div 
                                style={{
                                        margin : '10px',
                                        width: "134px",
                                        margin: "auto",
                                        borderRadius : "500px",
                                        backgroundColor: "#CC5749",
                                        color: "white",
                                        padding: "2.5%",
                                        fontSize: "25px"}}>
                                        {participants} 
                                        <img src={user} style={{width : `${22}px`}}/>
                            </div>
                            {/* <br/> */}
                            <div style={{width: "134px",
                                        margin: "auto"}}>
                                <div 
                                    style={{
                                            margin : '10px',
        
                                            borderRadius : "500px",
                                            backgroundColor: "#7E5E36",
                                            color: "white",
                                            padding: "3%",
                                            fontSize: "30px"}}>
                                            {eth} ETH
                                </div>
                            </div>
                        </div>
                        <a href="#" className="btn btn-primary">Join</a> 
                    </div>
                </div>
            </div>
                )

    }
}

export default GameCard;