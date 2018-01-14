/**
 * Created by alfredhong on 2018-01-14.
 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';

class AudienceContainer extends Component {
    constructor(props) {
        super();

        this.state = {
        };

    }



    componentDidMount() {
        let header = new Headers({'Content-Type': 'application/json'});

        let fetchArgs = {
            method: 'POST',
            body: JSON.stringify({ name: 'johnny' }),
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        fetch("https://ahong1.lib.id/addUserToRoom@dev/", fetchArgs).then(res => res.json())
            .then(res => console.log('result is', res))
            .catch(err => console.warn(err));

    }

    increaseLouder = () => {
        console.log('clicked');
        let header = new Headers({'Content-Type': 'application/json'});

        let fetchArgs = {
            method: 'POST',
            body: JSON.stringify({ name: 'johnny' }),
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        fetch("https://ahong1.lib.id/increaseLoud@dev/", fetchArgs).then(res => res.json())
            .then(res => console.log('result is', res))
            .catch(err => console.warn(err));
    }

    increaseQuieter = () => {
        console.log("QUIET")

        let header = new Headers({'Content-Type': 'application/json'});

        let fetchArgs = {
            method: 'POST',
            body: JSON.stringify({ name: 'johnny' }),
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        fetch("https://ahong1.lib.id/quieter@dev/", fetchArgs).then(res => res.json())
            .then(res => console.log('result is', res))
            .catch(err => console.warn(err));
    }

    increaseSpeed = () => {
        console.log("SPEEDUP")

        let header = new Headers({'Content-Type': 'application/json'});

        let fetchArgs = {
            method: 'POST',
            body: JSON.stringify({ name: 'johnny' }),
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        fetch("https://ahong1.lib.id/speedup@dev/", fetchArgs).then(res => res.json())
            .then(res => console.log('result is', res))
            .catch(err => console.warn(err));
    }

    increaseSlow = () => {
        console.log("Slow")

        let header = new Headers({'Content-Type': 'application/json'});

        let fetchArgs = {
            method: 'POST',
            body: JSON.stringify({ name: 'johnny' }),
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        fetch("https://ahong1.lib.id/slowdown@dev/", fetchArgs).then(res => res.json())
            .then(res => console.log('result is', res))
            .catch(err => console.warn(err));
    }

    increaseSmile = () => {

        console.log("Smile")

        let header = new Headers({'Content-Type': 'application/json'});

        let fetchArgs = {
            method: 'POST',
            body: JSON.stringify({ name: 'johnny' }),
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        fetch("https://ahong1.lib.id/smile@dev/", fetchArgs).then(res => res.json())
            .then(res => console.log('result is', res))
            .catch(err => console.warn(err));
    }


    componentWillUnmount(){
        let header = new Headers({'Content-Type': 'application/json'});

        let fetchArgs = {
            method: 'POST',
            body: JSON.stringify({ name: 'johnny' }),
            headers: header,
            mode: 'cors',
            cache: 'default'
        };

        fetch("https://ahong1.lib.id/decreaseUsers@dev/", fetchArgs).then(res => res.json())
            .then(res => console.log('result is', res))
            .catch(err => console.warn(err));

    }








    render() {
        return (
            <div className="audienceWrapper">
                <Button onClick={this.increaseLouder}>Louder!</Button>
                <Button onClick={this.increaseQuieter}>Quiet!</Button>
                <Button onClick={this.increaseSpeed}>Faster!</Button>
                <Button onClick={this.increaseSlow}>Slower!</Button>
                <Button onClick={this.increaseSmile}>Smile!</Button>



            </div>
        );
    }

}

export default AudienceContainer;
