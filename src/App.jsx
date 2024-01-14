import { useState, useEffect, useRef } from "react"
import BlogService from "./services/BlogService"
import Blog from "./components/Blog/Blog"
import Notification from "./components/Notification/Notification"
import Togglable from "./components/Togglable/Togglable"
import BlogForm from "./components/BlogForm/BlogForm"
import LoginForm from "./components/LoginForm"
import "./index.css"
import styles from "./App.module.css"

const App = () => {
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [notification, setNotification] = useState(null)

    const togglableRef = useRef()

    useEffect(() => {
        BlogService
            .getBlogs().then(blogs => setBlogs(blogs)
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
    )

    const createBlog = ({ title, url }) => {
        const blogObject = {
            title: title,
            author: user.name,
            url: url
        }
        try {
            togglableRef.current.toggleVisibility()
            BlogService
                .createBlog(blogObject)
                .then(returnedBlog => {
                    setBlogs(blogs.concat({ ...returnedBlog, user: { id: returnedBlog.user } }))
                    const notificationText = `New blog added: ${blogObject.title} by ${blogObject.author}`
                    setNotification({ text: notificationText, isError: false })

                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })
        } catch (exception) {
            setNotification({ text: exception.message, isError: true })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    const _BlogForm = () => (
        <Togglable buttonLabel="Add blog" ref={togglableRef}>
            <BlogForm createBlog={createBlog}
                togglableRef={togglableRef} />
        </Togglable>
    )

    const _LoginForm = () => (
        <Togglable buttonLabel="Login">
            <LoginForm setUser={setUser}
                setNotification={setNotification} />
        </Togglable>
    )

    const setLikes = (blogId, newLikes) => {
        BlogService.updateBlog({ id: blogId, likes: newLikes })
        const updatedBlogs = blogs.map((blog) =>
            blog.id == blogId ? { ...blog, likes: newLikes } : blog)
        setBlogs(updatedBlogs)
    }

    const delBlog = (blog) => {
        if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
            BlogService.deleteBlog(blog.id)
            const updatedBlogs = blogs.filter(b => b.id !== blog.id)
            setBlogs(updatedBlogs)
            setNotification({ text: "Blog deleted", isError: false })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }

    }

    return (
        <div className={styles.App}>
            <h1>Blog-app</h1>

            <Notification notification={notification} />

            {!user && _LoginForm()}
            {user && <div>
                <p>Logged in as: {user.name}</p>
                {logoutButton()}
                {_BlogForm()}
            </div>
            }

            <h2>Blogs</h2>

            {blogs
                .slice()
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog key={blog.id} blog={blog} user={user} setLikes={setLikes} delBlog={delBlog} />
                ))}
        </div>
    )

}

export default App