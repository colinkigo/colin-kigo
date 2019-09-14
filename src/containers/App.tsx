import * as React from 'react';
const css = require('./../assets/css/main.css');

import { About } from './About';
import Comments from './Comments/comments';

export default class App extends React.Component {
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