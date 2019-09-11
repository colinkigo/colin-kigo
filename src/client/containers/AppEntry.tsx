import * as React from 'react';
const css = require('./../../client/assets/css/main.css');

import { About } from './About';
import { Comments } from './Comments';

export class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <About />
                    <Comments />
                </div>
            </div>
        );
    }
}