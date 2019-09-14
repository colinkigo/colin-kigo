import * as React from "react";
const css = require('./comments.css');

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Form } from '../../components/Form';
import { Comment } from '../../components/Comment';

// import Modal from "react-responsive-modal";
import axios from 'axios';

const styles = {
    textAlign: "center"
};

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

export class Comments extends React.Component<{}, IState> {
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

    getNewComment = (comm) => {
        if (comm === '') {
            alert("Cannot submit empty review. Please enter a review about Colin");
            return;
        } else if (this.state.profile.name === '') {
            alert("You have to be logged in to comment");
            return;
        } else {
            axios.post('/api/home', {
                user: this.state.profile.name,
                comm
            })
                .then(response => {
                    console.log("NEW DATA:", response.data);
                    let comms = this.state.comments;
                    comms.push(response.data.comment);
                    this.setState({ comments: comms })
                    // this.setState({profile: });
                    // console.log(this.state.comments);
                    console.log("SERVER: COMMENT ADDED!!");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    updateReview = (update, data, callback) => {
        let { _id, user, comm } = data;

        if (update === '' || update === comm) {
            console.log("Nothing changed... please check again.")
        }
        else {
            axios.put(`/api/home/${_id}`, {
                user,
                comm: update
            })
                .then(response => {
                    console.log("SERVER: COMMENT EDIT COMPLETE!");
                    let comms = this.state.comments;
                    let index = comms.findIndex((c) => c['_id'] === _id);
                    comms[index][comm] === response.data.comment ? comms[index]['comm'] = response.data.comm : '';
                    this.setState({ comments: comms }, () => {
                        callback(); 
                    });
                    
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    deleteReview = (data) => {
        let { _id, user, comm } = data;
        let comms = this.state.comments;

        const payload = {
            user,
            comm
        }

        axios.delete(`/api/home/${_id}`, { params: payload })
            .then(() => {
                console.log("SERVER: COMMENT DELETED!!");
                let i = comms.findIndex(c => c['_id'] === _id);
                comms.splice(i, 1);
                this.setState({ comments: comms });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillMount() {
        axios.get('http://localhost:3010/api/home')
            .then(response => {
                this.setState({ 
                    comments: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        console.log(this);
        const { profile, comments, open } = this.state;
        let comms = comments.map((value, key) => {
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
        }).reverse();

        comms.forEach(element => {
            console.log("COMMS:", element.props.data);
        });

        return (
            <div className="col-4 sidebar">
                <div className="sidebar__login-auth">
                {profile.name ? <div className="sidebar__login-auth--logged"><p>Logged in as {profile.name}</p></div> : <div className="sidebar__login-auth--logged"><p>Please log in to comment</p></div>}

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
                <Form
                    profile={profile}
                    sendData={this.getNewComment}
                />

                <div className="comments">
                    <div>
                        {comms}
                    </div>
                </div>
            </div>
        );
    }
}