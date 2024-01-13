import { useState } from "react"


const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: "", url: "https://" })

    const handleBlogSubmit = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog({ title: "", url: "https://" })
    }

    return (
        <div>
            <h2>Add a new  blog</h2>
            <form onSubmit={handleBlogSubmit}>
                <div>
                    Title
                    <input
                        name="Title"
                        type="text"
                        placeholder='Title'
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
                        placeholder='url'
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

export default BlogForm