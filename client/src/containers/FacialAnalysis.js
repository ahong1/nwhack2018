import React, { Component } from 'react';
import './App.css';
import RecordRTC from "recordrtc";
import BackButton from '../components/BackButton';
import Camera from "react-camera";

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia || navigator.msGetUserMedia);

var recordRTC;

class FacialAnalysis extends Component {
    constructor(props) {
        super();

        this.state = {
            newImage: false
        };


    }

    componentDidMount() {



    }





    render() {
        return (
            <div style={style.container}>
                <Camera
                    style={style.preview}
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                >
                    <div style={style.captureContainer} onClick={this.takePicture}>
                        <div style={style.captureButton} />
                    </div>
                </Camera>
                <img
                    style={style.captureImage}
                    ref={(img) => {
                        this.img = img;
                    }}
                />
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
