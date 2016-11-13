let AUTH_API_URL;
let API_URL;

if (__DEVTOOLS__) {
    AUTH_API_URL = "http://localhost:5000";
    API_URL = "http://localhost:5001";
} else {
    AUTH_API_URL = "https://identity.gmbuddy.com";
    API_URL = "https://api.gmbuddy.com";
}

export { AUTH_API_URL, API_URL };
