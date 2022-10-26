import React from 'react';

// created a Signin smart function, we are recieveing the onroutechange function
class Signin extends React.Component {
    // creating the states (to be able to use props we have to pass props as a pramater)
    constructor(props) {
        super(props);
        this.state = {
            SigninEmail: '',
            SigninPassword: ''
        }
    }

    // this will listen to the onchange event of the email
    onEmailChange = (event) => {
        // this will set the state of the signin email to the value of the email
        this.setState({ SigninEmail: event.target.value })
    }

    // this will listen to the onchange event of the password
    onPasswordChange = (event) => {
        // this will set the state of the signin email to the value of the password
        this.setState({ SigninPassword: event.target.value })
    }

    // when the sign in form has been submitted do this
    onSubmitSignIn = () => {
        // here we fetch the local host and the sign in route
        fetch('https://gleeful-bienenstitch-247cb3.netlify.app/signin', {
            // we specifiy that we want to do a POST mether (i.e. post the values)
            method: 'post',
            // we specifi that it is a JSON file
            headers: { 'Content-type': 'application/json' },
            // we then convert the this.state.SigninEmail and this.state.SigninPassword from JavaScript to JSON and we put the email as this.state.SigninEmail 
            // password as this.state.SigninPassword
            body: JSON.stringify({
                email: this.state.SigninEmail,
                password: this.state.SigninPassword

            })
        })
            // we are converting the response from JSON to javaScript 
            .then(response => response.json())
            //  check the response to see if user.id exists and call two functions if a user is returned from the backend: loadUser(user) and onRouteChange('home')
            .then(user => {
                if(user.id){ // does the user exist? Did we receive a user with a property of id?
                  this.props.loadUser(user);
                  this.props.onRouteChange('home');
                }
              })
    }

    render() {
        // adding this.props to onRouteChange as this is a smart function
        const { onRouteChange } = this.props;
        return (
            // taken from card code (first line) - https://tachyons.io/components/cards/product-card/index.html
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                {/* // tacyons sign in form, you can find the code here: https://tachyons.io/components/forms/sign-in/index.html */}
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                {/* we need to do htmlFor instead of for */}
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    // when you enter the email we call the onEmailChange function
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    // when you enter the password we call the onPasswordChange function
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                // this runs the onSubmitSignIn function
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            {/* change to a p tage and add the onRouteChange function and when register is clicked pass the  'register' parameter*/}
                            <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;