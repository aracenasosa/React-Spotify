export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = "0631eb8ef3bf4d7693269e9b092dd1de";
//export const redirectUri = "https://react-spotify-eta.vercel.app/home/";
export const redirectUri = "http://localhost:3000/home/";
export const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-recently-played",
    "user-library-read",
    "user-library-modify",
    "playlist-modify-public",
    "playlist-modify-private"
];
