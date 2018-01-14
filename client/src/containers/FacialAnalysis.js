import React, { Component } from 'react';
import './App.css';
//import axios from "axios"

class FacialAnalysis extends Component {
    constructor(props) {
        super();

        this.state = {
            newImage: false
        };


    }

    componentDidMount() {
        /*axios.get("https://ahong1.lib.id/addUserToRoom@dev/").then(() => {
            console.log("done")

        })*/


    }





    render() {
        return (
            <div style={style.container}>
            </div>
        );
    }

}

const style = {
    preview: {
        position: 'relative',
    },
    captureContainer: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        zIndex: 1,
        bottom: 0,
        width: '100%'
    },
    captureButton: {
        backgroundColor: '#fff',
        borderRadius: '50%',
        height: 56,
        width: 56,
        color: '#000',
        margin: 20
    },
    captureImage: {
        width: '100%',
    }
};

export default FacialAnalysis;
