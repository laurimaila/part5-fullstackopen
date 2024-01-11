import { useState } from "react"
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
                    name="Username"
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Password
                <input
                    name="Password"
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm