import { useState } from "react"
import styles from "./Blog.module.css"

const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false)

    return (
        <div className={styles.blog}>
            <span className={styles.title}>{blog.title}</span>
            <button onClick={() => (setVisible(!visible))}>{visible ? "hide" : "view"}</button>
            {visible &&
                <div>
                    <div>{blog.url}</div>
                    <div>{blog.likes}</div>
                    <div>{blog.author}</div>
                </div>
            }
        </div >
    )
}

export default Blog