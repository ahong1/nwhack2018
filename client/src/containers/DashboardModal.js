import React, { Component } from 'react';
//import axios from "axios"
import {Modal} from 'react-bootstrap'
import Myo from 'myp';


// Myo.connect('com.example.ticktocktock');
//
// Myo.on('fist', function(){
//     console.log('Hello Myo!');
//     Myo.myos[0].vibrate('short');
//     Myo.myos[0].vibrate('short');
// });

class DashboardModal extends Component {
    constructor(props) {
        super();

        this.handleHide = this.handleHide.bind(this);
        this.state = {
           showModal: false
        };


    }
    //
    // componentDidMount() {
    //     let header = new Headers({'Content-Type': 'application/json'});
    //
    //     let fetchArgs = {
    //         method: 'POST',
    //         body: JSON.stringify({ name: 'johnny' }),
    //         headers: header,
    //         mode: 'cors',
    //         cache: 'default'
    //     };
    //
    //     fetch("https://ahong1.lib.id/checkStats@dev/", fetchArgs).then(res => res.json())
    //         .then(res => console.log('result is', res))
    //         .catch(err => console.warn(err));
    // }
    //
    // handleClose() {
    //     this.setState ({
    //         showModal: false
    //     })
    // }





    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.handleClose}>
                <div className="">
                    This Works!
                </div>
            </Modal>
        );
    }

}

export default DashboardModal;
