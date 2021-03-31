import axios from 'axios';
import { useState, useEffect } from 'react';
import { Credentials } from './credentials';

export const GetToken = search => {

    const [token, setToken] = useState('');

    useEffect(() => {

        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(Credentials.client_id + ':' + Credentials.client_secret)}`,
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
            .then(tokenResponse => {
                setToken(tokenResponse.data.access_token);
            })
            .catch(err => console.error(err));

    }, [ search ]);

    return token;
};


export const GetArtists = async (search, token) => {
    const { data: { artists: { items } } } = await axios(`https://api.spotify.com/v1/search?q=${search}&type=artist&limit=50`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};

export const GetTrack = async (search, token) => {
    const { data: { tracks: { items } } } = await axios(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=12`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};

export const GetAlbum = async (id, token) => {
    const { data: { items } } = await axios(`https://api.spotify.com/v1/artists/${id}/albums?offset=0&limit=50&include_groups=album,single,compilation,appears_on`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};


export const GetUser = async (user, token) => {
    const data = await axios(`https://api.spotify.com/v1/users/${user}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });

    return data;
};

export const GetPlaylist = async (token) => {
    const { data: { playlists: { items } } } = await axios(`https://api.spotify.com/v1/browse/featured-playlists?limit=50`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};


export const GetSpecificArtist = async (search, token) => {
    const {data} = await axios(`https://api.spotify.com/v1/artists/${search}?limit=50`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
};

export const GetSpecificAlbum = async (id, token) => {
    const { data } = await axios(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
};

export const GetArtistTopTrack = async (search, token) => {
    const { data: { tracks } } = await axios(`https://api.spotify.com/v1/artists/${search}/top-tracks?market=US`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return tracks;
};


export const GetNewReleases = async token => {
    const { data: { albums: { items } } }  = await axios(`https://api.spotify.com/v1/browse/new-releases?limit=50`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};

export const GetRelatedArtist = async (search, token) => {
    const { data: { artists } } = await axios(`https://api.spotify.com/v1/artists/${search}/related-artists`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return artists;
};

export const GetAppears_on = async (search, token) => {
    const { data: { items } } = await axios(`https://api.spotify.com/v1/artists/${search}/albums?include_groups=appears_on`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};

export const GetUserProfile = async (token) => {
    const { data } = await axios(`https://api.spotify.com/v1/me/`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
};

export const GetUserPlaylist = async (token) => {
    const {data: { items }} = await axios(`https://api.spotify.com/v1/me/playlists?limit=50`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};

export const GetUserRecentlyPlayed = async (token) => {
    const {data: { items }} = await axios(`https://api.spotify.com/v1/me/player/recently-played?limit=50`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};

export const GetSpecifiedPlaylist = async ( playlist, token) => {
    const {data} = await axios(`https://api.spotify.com/v1/playlists/${playlist}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
};

export const GetBrowseCategories = async (token) => {
    const {data: { categories: { items } }} = await axios(`https://api.spotify.com/v1/browse/categories`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};

export const GetCategoryPlaylist = async ( id, token ) => {
    const {data: { playlists: { items } }} = await axios(`https://api.spotify.com/v1/browse/categories/${id}/playlists?limit=50`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};

export const GetLikedSongs = async ( token ) => {
    const {data: {items}} = await axios(`https://api.spotify.com/v1/me/tracks?limit=50`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return items;
};

export const DeleteLikedSong = async ( id, token ) => {
    const data = await axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
};

export const PutSaveTracks = async ( id, token ) => {

    const data = fetch(`https://api.spotify.com/v1/me/tracks?ids=${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return data;
};

export const PostPlaylist = async ( id, token, name, description, state ) => {

    const data = fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, public: state })
    })

    return data;
};

export const PutPlaylist = async ( id, token, name, description, state ) => {

    const data = fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description: description.trim().length > 0 ? description  : "", "public": state === 'true' ? true : false })
    })

    return data;
};

export const AddItemToPlaylist = async ( playlist, token, uri ) => {

    const data = fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks?position=0&uris=${uri}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    return data;
};

export const RemoveItemToPlaylist = async ( playlist, token, uri ) => {

    const data = fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "tracks": [ { uri } ] })
    })

    return data;
};


