import React from 'react'
import $ from 'jquery'
import {Button} from 'react-bootstrap'

export default class About extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aboutMeEdit: false,
      aboutMe: this.props.aboutMe
    }
  }

  // If about me is being edited, will send post request to server to update user's aboutMe information
  handleAboutMeEdit = (evt) => {
    evt.preventDefault()
    if (this.state.aboutMeEdit === true) {
      var aboutMe = this.refs.aboutMe.value;
      $.post('/aboutMeEdit', {data: aboutMe})
        .done(data => {
          console.log('About me edited successfully');
          this.setState({
            aboutMeEdit: false,
            aboutMe: data.aboutMe
          })
        })
        .fail((err) => {
          console.error('cannot signIn', err);
        });
    } else {
      this.setState({
        aboutMeEdit: true
      })
    }
  }

  render() {
    const aboutMeEdit = (
      <form className="aboutMeForm">
        <textarea className="aboutMe" ref="aboutMe">{this.state.aboutMe}</textarea>
        <Button className="aboutMeSubmitButton" onClick={() => this.handleAboutMeEdit()} bsSize='small' bsStye='defualt'>
          Save Changes
        </Button>
      </form>
    )

    const aboutMe = (
      <div className="aboutMe" onClick={() => this.handleAboutMeEdit()}>
        {this.state.aboutMe}
      </div>
    )

    return (
      <div className='aboutMeParentContainer'>
        <div className='welcomeBackTitle'>
          Welcome Back, {this.props.user}
        </div>
        <div className='profilePicture'></div>
        <div className="aboutMeContainer">
          {this.state.aboutMeEdit ? aboutMeEdit : aboutMe}
        </div>
      </div>
    )
  }
}