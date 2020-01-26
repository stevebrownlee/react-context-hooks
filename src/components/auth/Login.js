import React, { useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import "./Login.css"


const Login = props => {
    const email = useRef()
    const password = useRef()
    const remember = useRef(false)
    const { login, isAuthenticated } = useSimpleAuth()

    if (!isAuthenticated() && props.location.pathname !== "/login") {
        props.history.push("/login")
    }

    // Simplistic handler for login submit
    const handleLogin = (e) => {
        e.preventDefault()
        const storage = remember.current.value !== "on" ? localStorage : sessionStorage

        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        console.log("*** Initiate authentication ***")
        login(email.current.value, password.current.value, storage)
            .then(() => {
                console.log("*** Rerouting to root URL ***")
                props.setAuth(true)
                props.history.push("/")
            })

    }

    return (
        <main style={{textAlign:"center"}}>
            <form className="form--login" onSubmit={handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <input ref={remember}
                        defaultChecked={remember.current.value}
                        type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember"> Remember Me </label>
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}
 export default Login