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

    }

    increaseLouder = () => {
        console.log('clicked');
        var header = new Headers({'Content-Type': 'application/json'});

        var fetchArgs = {
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

    





    render() {
        return (
            <div className="audienceWrapper">
                <Button onClick={this.increaseLouder}>Louder!</Button>

            </div>
        );
    }

}

export default AudienceContainer;
