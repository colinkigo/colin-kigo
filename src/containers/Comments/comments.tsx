import * as React from "react";
const css = require('./comments.css');
import { Dispatch, bindActionCreators, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { getComments, addNewReview, updateReview, deleteReview } from '../../actions'

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Form } from '../../components/Form';
import { Comment } from '../../components/Comment';

// import Modal from "react-responsive-modal";
import axios from 'axios';

export interface IState {
  profile: IProfile,
  comments: Array<object>,
  open: boolean
};

export interface IProfile {
  name: string,
  email: string,
  familyName: string,
  givenName: string,
  imageUrl: string,
}

class Comments extends React.Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      profile: {
        name: '',
        email: '',
        familyName: '',
        givenName: '',
        imageUrl: '',
      },
      comments: [],
      open: false
    }
  }

  responseGoogle = (response) => {
    this.setState({
      profile: {
        name: response.profileObj.name,
        email: response.profileObj.email,
        familyName: response.profileObj.familyName,
        givenName: response.profileObj.givenName,
        imageUrl: response.profileObj.imageUrl,
      }
    });
  }

  public onSubmit = async (comm) => {
    const { name } = this.state.profile
    if (!comm) {
      alert("Cannot submit empty review. Please enter a review about Colin");
      return;
    } else {
      await this.props.addNewReview(name, comm)
      console.log("SERVER: COMMENT ADDED!!");
    }
  }

  updateReview = async (update, data, callback) => {
    let { _id, user, comm } = data;
    const { comments = [] } = this.props

    if (update === '' || update === comm) {
      console.log("Nothing changed... please check again.")
      return
    } else {
      const result = await this.props.updateReview(_id, user, update)
      if (result) {
        console.log("SERVER: COMMENT EDIT COMPLETE!");
        let comms = comments;
        let index = comms.findIndex((c) => c['_id'] === _id);
        comms[index][comm] === result.data.comment ? comms[index]['comm'] = result.data.comm : '';
        this.setState({ comments: comms }, () => {
          callback();
        });
      }
    }
  }

  deleteReview = async (data) => {
    let { _id, user, comm } = data;
    const { comments } = this.props
    const payload = { user, comm }
    const result = await this.props.deleteReview(_id, payload)
    if (result) {
      console.log("SERVER: COMMENT DELETED!!");
      let i = comments.findIndex(c => c['_id'] === _id);
      comments.splice(i, 1);
      await this.setState({ comments });
    }
  }

  async componentDidMount() {
   await this.props.getComments()
  }

  render() {
    const { profile , open } = this.state;
    const { comments = [] } = this.props
    let comms = comments ? comments.map((value, key) => {
      return (
        <Comment
          // open={this.state.open}
          key={key}
          profile={this.state.profile}
          data={value}
          editableColor={''}
          updateReview={this.updateReview}
          deleteReview={this.deleteReview}
        />
      );
    }).reverse() : this.state.comments

    return (
      <div className="col-4 sidebar">
        <div className="sidebar__login-auth">
          {profile.name ? <div className="sidebar__login-auth--logged"><p>Logged in as {profile.name}</p></div> : <div className="sidebar__login-auth--logged"><p>Please log in to leave a review :)</p></div>}

          <div className="log">
            {profile.name ?
              <GoogleLogout /> :
              <>
                <GoogleLogin
                  clientId="1050794496566-p7qgceov5t4428jptk0n000e6bh3eamf.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />
                <p className="">Login with Google</p>
              </>
            } </div>
        </div>
        <Form profile={profile} sendData={this.onSubmit} />
        <div className="comments"><div>{comms}</div></div>
      </div>
    );
  }
}

const dispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  const action = {
    getComments,
    addNewReview,
    updateReview,
    deleteReview
  }

  return bindActionCreators(action, dispatch)
}

const stateToProps = (state) => {
  return {
    comments: state.reviews.data
  }
}

export default connect(stateToProps, dispatchToProps)(Comments)