import React from 'react'
import $ from 'jquery'
import {Button, ButtonGroup, DropdownButton, MenuItem, Modal, NavItem} from 'react-bootstrap'

import {Tabs, Tab, Dialog, FlatButton, TextField} from 'material-ui';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showInvalidFieldsError: false,
      showInvalidUsernameOrPassword: false,
      username: undefined,
      password: undefined
    }
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  handleSignIn = () => {
    var user = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log('user', user);
    // If user didn't enter username or password, displays an error message for 2 seconds
    if (!user.username || !user.password) {
      this.setState({
        showInvalidFieldsError: true
      }, function() {
        var setState = this.setState.bind(this);
        setTimeout(function() {
          setState({showInvalidFieldsError: false});
        }, 2000);
      });
      return;
    }
    $.post('/api/signin', {data: user})
      .done((data) => {
        console.log('data', data);
        // Depending on the error, the server will respond with a given message.
        if (data === 'Username and/or password invalid.') {
          this.setState({
            showInvalidUsernameOrPassword: true
          }, function() {
            var setState = this.setState.bind(this);
            setTimeout(function() {
              setState({showInvalidUsernameOrPassword: false});
            }, 2000);
          });
          return;
        } else {
          this.props.signIn();

          // Changing the window.location allows the React-router to render the correct component
          window.location = '/#/profile';
        }
        // Hides the modal window
        this.setState({
          show: false
        })
      })
    .fail((err) => {
      console.error('cannot signin');
    });
  }

  handleChange = (prop, e) => {
    var newState = this.state;
    newState[prop] = e.target.value;
    this.setState(newState);
  };

  // Hides the modal window
  close = () => {
    this.setState({
      show: false
    });
  };

  // Shows the modal window
  show = () => {
    this.setState({
      show: true
    });
  };

  render() {
    var invalidFieldsError = <div> Please fill out all forms. </div>
    var invalidUsernameOrPassword = <div> Incorrect username or password. </div>

    const actions = [
      <TextField
        floatingLabelText="Username"
        ref="username"
        onChange={this.handleChange.bind(this, 'username')}
      />,
      <TextField
        floatingLabelText="Password"
        type="password"
        ref="password"
        onChange={this.handleChange.bind(this, 'password')}
      />,
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.close}
      />,
      <FlatButton
        label="Sign In"
        primary={true}
        onTouchTap={this.handleSignIn}
        onRequestClose={this.close}
      />
    ];

    return (
      <div>
      <Tab 
        label='Log In'
        onTouchTap={this.show}
      >
      </Tab>
      <Dialog
        title='Sign In'
        ref= "dialog"
        actions={actions}
        modal={true}
        open={this.state.show}
        >
      </Dialog>
    
      </div>
    )
  }
}
