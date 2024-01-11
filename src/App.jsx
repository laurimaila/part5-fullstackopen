import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import BlogService from "./services/BlogService"
import "./index.css"
//import styles from "./App.module.css"

const App = () => {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)

    const togglableRef = useRef()

    useEffect(() => {
        BlogService
            .getAll().then(blogs => setBlogs(blogs)
            )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            BlogService.setToken(user.token)
        }
    }, [])

    const logoutButton = () => (
        <button onClick={() => {
            window.localStorage.removeItem("loggedBlogappUser")
            setUser(null)
            setNotification({ text: "Logged out succesfully", isError: false })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }}>
            Logout
        </button>
    );

    const _BlogForm = () => (
        <Togglable buttonLabel="Add blog" ref={togglableRef}>
            <BlogForm user={user} setNotification={setNotification} blogs={blogs} setBlogs={setBlogs}
                togglableRef={togglableRef} />
        </Togglable>
    )

    const _LoginForm = () => (
        <Togglable buttonLabel="Login">
            <LoginForm setUser={setUser}
                setNotification={setNotification} />
        </Togglable>
    )

    return (
        <div>
            <h1>Blogs</h1>

            <Notification notification={notification} />

            {!user && _LoginForm()}
            {user && <div>
                <p>Logged in as: {user.name}</p>
                {logoutButton()}
                {_BlogForm()}
            </div>
            }

            <h2>Blogs</h2>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )

}

export default App