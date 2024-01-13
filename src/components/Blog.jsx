import { useState } from "react"
import styles from "./Blog.module.css"

const Blog = ({ blog, user, setLikes, delBlog }) => {
    const [visible, setVisible] = useState(false)
    return (
        <div className={styles.blog}>
            <div className={styles.blogline}>
                <span>{blog.title}</span>
                <button onClick={() => (setVisible(!visible))}>{visible ? "hide" : "view"}</button>
            </div>
            {visible &&
                <>
                    <div className={styles.blogline}>{blog.url}</div>
                    <div className={styles.blogline}>{blog.likes} likes
                        <button onClick={() => (setLikes(blog.id, blog.likes + 1))}>Like</button>
                    </div>
                    <div className={styles.blogline}>Author: {blog.author}</div>
                    {(blog.user.id === user.id) &&
                        <button onClick={() => (delBlog(blog))}>Remove</button>
                    }
                </>
            }
        </div >
    )
}

export default Blog