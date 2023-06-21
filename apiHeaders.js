// GET requests to the Wordpress api are protected by JWT.
// App thus first needs to fetch the JWT token.

const username = '';
const applicationPassword = '';

let headers = new Headers();

const getHeaders = async () => {
    try {
        const url = `https://lucifarian.be/wp-json/jwt-auth/v1/token?username=${username}&password=${applicationPassword}`;
        const res = await fetch(url, {
            "method": "POST"
        });
        const json = await res.json();

        headers.append('Authorization', `Bearer ${json.token}`);
    } catch (err) {
        console.error(err);
    }
}

export { getHeaders, headers };
