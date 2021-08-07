import React from 'react'
import {connect} from 'react-redux'
import {signIn, signOut} from '../actions'

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:
                "255979661163-08mtv8o6fotlviqo4veuj5emfg7fnadl.apps.googleusercontent.com",
                scope: 'email'
            }).then(()=> {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignIn.get())
                this.auth.isSignIn.listen(this.onAuthChange)
            });
        })
    }

    onAuthChange = (isSignIn) => {
        if(isSignIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () =>{
        this.auth.signOut()
    }

    renderAuth(){
        if(this.props.isSignIn === null){
            return null
        } else if(this.props.isSignIn){
            return(
                <button onClick={this.onSignOutClick} className='ui red google button'>
                    <i className='google icon'/>
                    Sign out
                </button>
            )
        } else {
            return (
              <button onClick={this.onSignInClick} className="ui green google button">
                <i className="google icon" />
                Sign in
              </button>
            );
        }
    }
    render(){
        return <div>{this.renderAuth()}</div>
    }
}

const mapStateToProps = (state) => {
    return {isSignIn: state.auth.isSignIn }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)