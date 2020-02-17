import * as React from "react";

import { IProfile } from '../../containers/Comments/comments';
import { Edit } from '../Modal/edit';
import { Delete } from '../Modal/delete';
const css = require('../../assets/scss/comment.scss');

import Modal from "react-responsive-modal";
interface IProps {
  // key: number;
  // open: boolean;
  profile: IProfile;
  data: object;
  editableColor: string;
  updateReview: Function;
  deleteReview: Function;
};

export class Comment extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: false,
      comment: '',
      open: false
    };
  };

  handleChange = (e) => {
    this.setState({ comment: e.target.innerHTML });
  };

  updateReview = (data) => {
    const update = this.state.comment;
    this.props.updateReview(update, data, () => {
      this.setState({ open: false });
    });
  };

  showModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  deleteReview = (data) => {
    this.setState({ open: false });
    this.props.deleteReview(data);
  };

  componentWillReceiveProps(nextProps) {
    console.log("Component will receive props ", nextProps);
  }

  render() {
    let { profile, data, editableColor } = this.props;

    return (
      <div className="col-8 comment">
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <h4>Edit review</h4>
          <div className="modal_edit">
            <p
              id="content"
              contentEditable
              suppressContentEditableWarning={true}
              // key={key}
              style={
                {
                  backgroundColor: this.state.active ? editableColor = '#ffffff' : editableColor
                }
              }
              onFocus={() => this.setState({ active: true })}
              onBlur={() => {
                this.setState({ active: false });
              }
              }
              onInput={this.handleChange}
            // onKeyDown={this.autosize}
            >
              {data['comm']}
            </p>
          </div>
          <div className="modal_update_delete">
            <button
              type="button"
              className="update btn btn-info btn-circle btn-lg"
              onClick={() => this.updateReview(data)}>
              <i className="glyphicon glyphicon-ok"></i>
            </button>
            <button
              type="button"
              className="delete btn btn-warning btn-circle btn-lg"
              onClick={() => this.deleteReview(data)}>
              <i className="glyphicon glyphicon-remove"></i>
            </button>
          </div>
        </Modal>

        <div className="update_delete">
          <div className="username">
            <p> {data['user']} <span>24-08-2019</span></p><br></br>
            <p className="occupation"> Lead Data Architect </p>
          </div>
          <span onClick={this.showModal} className="edit glyphicon glyphicon-option-vertical"></span>
        </div>

        <div className="editable">
          <p> {data['comm']} </p>
        </div>
      </div>
    );
  }
}