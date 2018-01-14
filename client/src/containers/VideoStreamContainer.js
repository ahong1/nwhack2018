import React, { Component } from 'react';
import './App.css';
import RecordRTC from "recordrtc";
import BackButton from '../components/BackButton';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);

var recordRTC;

class VideoStreamContainer extends Component {
    constructor(props) {
        super();

        this.state = {
            recordVideo: null,
            src: null,
            uploadSuccess: null,
            uploading: false,
        };

        this.requestUserMedia = this.requestUserMedia.bind(this);
        this.captureUserMedia = this.captureUserMedia.bind(this);

    }


    componentDidMount() {
        if(!hasGetUserMedia) {
            alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
            return;
        }
        this.requestUserMedia();
    }

    sendData(blob) {


    }

    captureUserMedia(callback) {
        var params = { audio: false, video: true };

        navigator.getUserMedia(params, callback, (error) => {
            alert(JSON.stringify(error));
        });
    };

    requestUserMedia() {
        console.log('requestUserMedia')
        var options = {
            videoBitsPerSecond: 128000,
            timeSlice: 10000,
            ondataavailable: function(blob){
                recordRTC.stopRecording(function(){
                    var blob = this.getBlob();
                    console.log(blob)
                })
                recordRTC.startRecording();

            }
        }
        this.captureUserMedia((stream) => {
            recordRTC = new RecordRTC(stream, options);
            recordRTC.startRecording();







            this.setState({ src: window.URL.createObjectURL(stream) });
            console.log('setting state', this.state)
        });
    }



    render() {
        return (
            <div className="VideoStreamWrapper">
                <BackButton />
                <video autoPlay muted src={this.state.src} />

            </div>
        );
    }
}

export default VideoStreamContainer;
