import { useState } from "react";
import BlogService from "../services/BlogService";


const BlogForm = ({ user, setNotification, blogs, setBlogs, togglableRef = { togglableRef } }) => {
    const [newBlog, setNewBlog] = useState({ title: "", url: "https://" });

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlog.title,
            author: user.name,
            url: newBlog.url
        }
        try {
            togglableRef.current.toggleVisibility()
            BlogService
                .create(blogObject)
                .then(returnedBlog => {
                    setBlogs(blogs.concat(returnedBlog));
                    setNewBlog({ title: "", url: "https://" });
                    const notificationText = `New blog added: ${blogObject.title} by ${blogObject.author}`;
                    setNotification({ text: notificationText, isError: false });

                    setTimeout(() => {
                        setNotification(null);
                    }, 5000);
                });
        } catch (exception) {
            setNotification({ text: exception.message, isError: true })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>Add a new blog</h2>

            <form onSubmit={addBlog}>
                <div>
                    Title
                    <input
                        name="Title"
                        type="text"
                        value={newBlog.title}
                        onChange={(event) => setNewBlog({
                            ...newBlog,
                            title: event.target.value
                        })}
                    />
                </div>
                <div>
                    URL
                    <input
                        name="URL"
                        type="url"
                        value={newBlog.url}
                        onChange={(event) => setNewBlog({
                            ...newBlog,
                            url: event.target.value
                        })}
                    />
                </div>
                <button type="submit">Save blog</button>
            </form>
        </div>
    )
}

export default BlogForm;