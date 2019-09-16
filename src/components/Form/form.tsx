import * as React from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { Button } from 'react-bootstrap'

import { IProfile } from '../../containers/Comments/comments';
const css = require('./form.css');

interface IProps {
  profile: IProfile;
  sendData: any;
}

export class Form extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      comm: '',
    }
  }

  textarea: HTMLTextAreaElement

  handleChange = (event) => {
    this.setState({ comm: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sendData(this.state.comm, event.target.name);
    this.setState({
      comm: ''
    });
    this.textarea.focus();
  };

  render() {
    return (
      this.props.profile.name ?
        <div className="comment_form">
          <form name="add" onSubmit={this.handleSubmit} method="post" action="/api/home">

            <TextareaAutosize
              type="text"
              className="textarea border-primary rounded"
              value={this.state.comm}
              onChange={this.handleChange}>
            </TextareaAutosize>
            <Button type="submit" className="primary">Submit</Button>
          </form>
        </div> : ''
    );
  }
}