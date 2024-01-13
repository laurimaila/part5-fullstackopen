const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getBlogs = () => {
    const req = fetch(baseUrl)
    return req.then(response => response.json())
}

const createBlog = async newObject => {
    const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body: JSON.stringify(newObject)
    })

    if (!response.ok) {
        throw new Error("Error creating blog")
    }
    return await response.json()
}

const updateBlog = async partialBlog => {
    const response = await fetch(`${baseUrl}/${partialBlog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body: JSON.stringify(partialBlog)
    })

    if (!response.ok) {
        throw new Error("Error creating blog")
    }
    return await response.json()
}

const deleteBlog = async blogId => {
    const response = await fetch(`${baseUrl}/${blogId}`, {
        method: "DELETE",
        headers: { "Authorization": token, "Accept": "application/json" },
    })

    if (!response.ok) {
        throw new Error("Error deleting blog")
    }
}

export default { getBlogs, createBlog, setToken, updateBlog, deleteBlog }