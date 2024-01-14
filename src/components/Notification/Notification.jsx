import styles from "./Notification.module.css"

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div data-test="notification" className={notification.isError ? styles.error : styles.success}>
            {notification.text}
        </div>
    )
}

export default Notification