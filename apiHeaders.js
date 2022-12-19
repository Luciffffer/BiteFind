const username = 'lucifer';
const applicationPassword = 'BB9W QOYA VHZJ 21uW bKEM Mu02';

let headers;

const getHeaders = async () => {
    try {
        const url = `https://lucifarian.be/wp-json/jwt-auth/v1/token?username=${username}&password=${applicationPassword}`;
        const res = await fetch(url, {
            "method": "POST"
        });
        const json = await res.json();
        console.log(json);

        const newHeaders = new Headers();
        newHeaders.append('Authorization', `Bearer ${json.token}`);
        headers = newHeaders;
    } catch (err) {
        console.error(err);
    }
}

export { getHeaders, headers };