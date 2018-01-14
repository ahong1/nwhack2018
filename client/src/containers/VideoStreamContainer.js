import React, { Component } from 'react';
import './App.css';
import RecordRTC from "recordrtc";
import Camera from "react-camera";
import FacialAnalysis from "./FacialAnalysis";
import DashboardModal from "./DashboardModal";

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
            imageID: 0
        };

        this.requestUserMedia = this.requestUserMedia.bind(this);
        this.captureUserMedia = this.captureUserMedia.bind(this);
        this.takePicture = this.takePicture.bind(this);

    }


    componentDidMount() {
        /*if(!hasGetUserMedia) {
            alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
            return;
        }
        this.requestUserMedia();*/
    }

    takePicture() {
        this.camera.capture()
            .then(blob => {
                let param = {
                    Body: blob,
                    Bucket: "nwhackspresentorface",
                    Key: "test.jpg"
                }

                this.props.S3.putObject(param, function(err,data){
                    if (err) console.log(err, err.stack); // an error occurred
                    else     console.log(data);
                })


                console.log(blob);
                this.img.src = URL.createObjectURL(blob);
                this.img.onload = () => { URL.revokeObjectURL(this.src); }
                this.setState({
                    imageID: this.state.imageID + 1
                })
            })
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
            timeSlice: 20000,
            ignoreMutedMedia: false,
            ondataavailable: function(blob){
                recordRTC.stopRecording(function(){
                    var blob = recordRTC.getBlob();
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
                <DashboardModal />
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

export default VideoStreamContainer;
