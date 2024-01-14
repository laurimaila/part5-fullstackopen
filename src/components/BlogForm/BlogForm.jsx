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
                        id="title-input"
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
                        id="url-input"
                        type="url"
                        placeholder='url'
                        value={newBlog.url}
                        onChange={(event) => setNewBlog({
                            ...newBlog,
                            url: event.target.value
                        })}
                    />
                </div>
                <button id="blog-submit" type="submit">Save blog</button>
            </form>
        </div>
    )
}

export default BlogForm