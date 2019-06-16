export const fetchIt = (url, method = "GET", body = null) => {
    let options = {
        "method": method
    }

    switch (method) {
        case "POST":
        case "PUT":
            options.headers = {
                "Content-Type": "application/json",
            }
            break;
    }

    if (body !== null) {
        options.body = body
    }

    return fetch(url, options).then(r => r.json())
}