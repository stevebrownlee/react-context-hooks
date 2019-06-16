import React, { Component } from "react"


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        remember: false
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleChecked = () => {
        this.setState({
          remember: !this.state.remember
        })
      }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()
        const storage = this.state.remember ? localStorage : sessionStorage

        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        storage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        )
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <fieldset>
                    <label htmlFor="inputEmail">
                        Email address
                    </label>
                    <input onChange={this.handleFieldChange} type="email"
                        id="email"
                        placeholder="Email address"
                        required="" autoFocus="" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword">
                        Password
                    </label>
                    <input onChange={this.handleFieldChange} type="password"
                        id="password"
                        placeholder="Password"
                        required="" />
                </fieldset>
                <fieldset>
                    <label htmlFor="remember">
                        Remember Me
                    </label>
                    <input onChange={this.handleChecked}
                           defaultChecked={this.state.remember}
                           type="checkbox" name="remember" id="remember"/>
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        )
    }
}
