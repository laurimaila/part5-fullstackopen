const baseUrl = "/api/login"

const login = async (credentials) => {
    const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        throw new Error("Unauthorized");
    }

    const data = await response.json();
    return data
}

export default { login }