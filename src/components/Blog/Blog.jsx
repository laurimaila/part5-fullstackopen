import { useState } from "react"
import styles from "./Blog.module.css"


const Blog = ({ blog, user, setLikes, delBlog }) => {
    const [visible, setVisible] = useState(false)
    return (
        <div className={styles.blog} data-test="blog">
            <div className={styles.blogline}>
                <div>{blog.title}</div>
                <button data-test="view-button" onClick={() => (setVisible(!visible))}>{visible ? "hide" : "view"}</button>
            </div>
            {visible &&
                <>
                    <div className={styles.blogline}>{blog.url}</div>
                    <div className={styles.blogline}>{blog.likes} likes
                        <button data-test="like" onClick={() => (setLikes(blog.id, blog.likes + 1))}>Like</button>
                    </div>
                    <div className={styles.blogline}>Author: {blog.author}</div>
                    {blog.user.id && user && blog.user.id === user.id &&
                        <button data-test="remove-button" onClick={() => (delBlog(blog))}>Remove</button>
                    }
                </>
            }
        </div >
    )
}

export default Blog