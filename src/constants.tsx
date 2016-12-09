let AUTH_API_URL;
let API_URL;
let SOCK_URL;

if (__DEVTOOLS__) {
    AUTH_API_URL = "http://localhost:5000";
    API_URL = "http://localhost:5001";
    SOCK_URL = "http://localhost:4000";
} else {
    AUTH_API_URL = "http://identity.gmbuddy.com";
    API_URL = "http://api.gmbuddy.com";
    SOCK_URL = "http://live.gmbuddy.com";
}

export { AUTH_API_URL, API_URL, SOCK_URL };
