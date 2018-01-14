import React, { Component } from 'react';
//import axios from "axios"
import {Modal} from 'react-bootstrap'
import Myo from 'myo';


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

        this.state = {
            showModal: false
        };

        this.handleFist.bind( this );


    }


    componentDidMount() {
        let header = new Headers({'Content-Type': 'application/json'});

        let dbModal = this;

        let fetchArgs = {
            method: 'POST',
            body: JSON.stringify({ name: 'johnny' }),
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        fetch("https://ahong1.lib.id/checkStats@dev/", fetchArgs).then(res => res.json())
            .then(res => console.log('result is', res))
            .catch(err => console.warn(err));

        Myo.on('fist', function(){
            console.log('Hello Myo!');
            Myo.myos[0].vibrate('short');
            Myo.myos[0].vibrate('short');
            dbModal.setState({ showModal: true,
                resetModal: setTimeout(1000, dbModal.handleClose )

            });

        } );
    }



    handleClose() {
        this.setState ({
            showModal: false
        })
    }

    handleFist() {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.handleClose}>
                'We made it'
            </Modal>
        );
    }

}

export default DashboardModal;
