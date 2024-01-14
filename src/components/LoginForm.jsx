import { useState } from "react"
import PropTypes from "prop-types"
import LoginService from "../services/LoginService"
import BlogService from "../services/BlogService"


const LoginForm = ({ setUser, setNotification }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await LoginService.login({
                username, password
            })
            window.localStorage.setItem(
                "loggedBlogappUser", JSON.stringify(user)
            )
            BlogService.setToken(user.token)
            setUser(user)
            setUsername("")
            setPassword("")
        } catch (exception) {
            setNotification({ text: exception.message, isError: true })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                Username
                <input
                    id="username-input"
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Password
                <input
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="submit-login" type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
}

export default LoginForm