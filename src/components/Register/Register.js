import React from 'react';

// created a Register pure function, we are recieveing the onroutechange function
class Register extends React.Component {
    // creating the states (to be able to use props we have to pass props as a pramater)
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    // this will listen to the onchange event of the name
    onNameChange = (event) => {
        // this will set the state of the signin email to the value of the email
        this.setState({ name: event.target.value })
    }

    // this will listen to the onchange event of the email
    onEmailChange = (event) => {
        // this will set the state of the signin email to the value of the email
        this.setState({ email: event.target.value })
    }

    // this will listen to the onchange event of the password
    onPasswordChange = (event) => {
        // this will set the state of the email to the value of the password
        this.setState({ password: event.target.value })
    }

    // when the sign in form has been submitted do this
    onSubmitSignIn = () => {
        // here we fetch the local host and the sign in route
        fetch('https://vast-everglades-17243.herokuapp.com/register', {
            // we specifiy that we want to do a POST mether (i.e. post the values)
            method: 'post',
            // we specifi that it is a JSON file
            headers: { 'Content-type': 'application/json' },
            // we then convert the this.state.SigninEmail and this.state.SigninPassword from JavaScript to JSON and we put the email as this.state.SigninEmail 
            // password as this.state.SigninPassword
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
            })
        })
            // we are converting the response from JSON to javaScript 
            .then(response => response.json())
            // the we are getting the urser 
            .then(user => {
                // if the data si equal to sucess (which is what we said in the server.js)
                if (user) {
                    // calls the loadUser function from the app.js script passing the user as a paramater
                    this.props.loadUser(user)
                    // when the signin button is clicked trigger the on onroutechange function and pass the 'home' parameter, (we do this.props as this is a prop)
                    this.props.onRouteChange('home')
                }
            })
    }

    render() {
        return (
            // taken from card code (first line) - https://tachyons.io/components/cards/product-card/index.html
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                {/* // tacyons sign in form, you can find the code here: https://tachyons.io/components/forms/sign-in/index.html */}
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            {/* add a new filed called name */}
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                    // when you enter the name we call the onNameChange function
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        );
    }

}

export default Register;