const baseUrl = "/api/blogs"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const req = fetch(baseUrl)
    return req.then(response => response.json())
}

const create = async newObject => {
    const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body: JSON.stringify(newObject)
    });

    if (!response.ok) {
        throw new Error("Error creating blog");
    }
    return await response.json();
}

export default { getAll, create, setToken }