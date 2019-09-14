import * as React from "react";
import TextareaAutosize from 'react-autosize-textarea';
import { Button } from 'react-bootstrap'

import { IProfile } from '../../containers/Comments/comments';
const css = require('./modal.css');

interface IProps {
  profile: IProfile;
  sendData: any;
}

export class Delete extends React.Component<any, any> {
  render() {
    return (
      <div>
        {/* Hello from delete ;) */}
      </div>
    );
  }
}