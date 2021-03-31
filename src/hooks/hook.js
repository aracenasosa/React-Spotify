import { useState, useEffect } from 'react';
import { GetArtists, 
    GetUser, 
    GetTrack, 
    GetAlbum, 
    GetPlaylist, 
    GetUserPlaylist, 
    GetSpecificArtist, 
    GetArtistTopTrack, 
    GetNewReleases, 
    GetSpecificAlbum,
    GetRelatedArtist,
    GetAppears_on,
    GetUserProfile,
    GetUserRecentlyPlayed,
    GetSpecifiedPlaylist,
    GetBrowseCategories,
    GetCategoryPlaylist,
    GetLikedSongs,
    DeleteLikedSong,
    PutSaveTracks,
    PostPlaylist,
    PutPlaylist,
    AddItemToPlaylist,
    RemoveItemToPlaylist
} from '../helpers/helper';

export const Artists = (search, token) => 
{
    const [ artist, setArtist ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetArtists( search, token ).then( data => setArtist( { data, loading: true, err: '' } ))
        .catch(err => setArtist( { data: [], loading: false, err } ));
    }, [ search, token ] );

    return artist;
};

export const Track = (search, token) => 
{
    const [ track, setTrack] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetTrack( search, token ).then( data => setTrack( { data, loading: true, err: '' } ))
        .catch(err => setTrack( { data: [], loading: false, err } ));
    }, [ search ] );

    return track;
};

export const User = (usr, token) => 
{
    const [ user, setUser ] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetUser( usr, token ).then( data => setUser( { data, loading: true, err: '' } ))
        .catch(err => setUser( { data: {}, loading: false, err } ));
    }, [ usr ] );
    
    return user;
};

export const ObtainAlbum = (id, token) => 
{
    const [ album, setAlbum ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetAlbum( id, token ).then( data => setAlbum( { data, loading: true, err: '' } ))
        .catch(err => setAlbum( { data: [], loading: false, err } ));
    }, [ id, token ] );
    
    return album;
};

export const FeaturedPlaylist = (token) => 
{
    const [ playlist, setPlaylist ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetPlaylist( token ).then( data => setPlaylist( { data, loading: true, err: '' } ))
        .catch(err => setPlaylist( { data: [], loading: false, err } ));
    }, [ token ] );
    
    return playlist;
};

export const UserPlaylist = ( token ) => 
{
    const [ userPlaylist, setUserPlaylist] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetUserPlaylist( token ).then( data => setUserPlaylist( { data, loading: true, err: '' } ))
        .catch(err => setUserPlaylist( { data: [], loading: false, err } ));
    }, [ token ] );
    
    return userPlaylist;
};

export const SpecificArtist = (search, token) => 
{
    const [ artist, setArtist] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetSpecificArtist(search, token).then( data => setArtist( { data, loading: true, err: '' } ))
        .catch(err => setArtist( { data: {}, loading: false, err } ));
    }, [ search, token ] );
    
    return artist;
};


export const Album = ( id, token ) => 
{
    const [ specificAlbum, setSpecificAlbum] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetSpecificAlbum( id, token ).then( data => setSpecificAlbum( { data, loading: true, err: '' } ))
        .catch(err => setSpecificAlbum( { data: {}, loading: false, err } ));
    }, [ id, token ] );
    
    return specificAlbum;
};


export const ArtistTopTrack = (search, token) => 
{
    const [ topTrack, setTopTrack] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetArtistTopTrack(search, token).then( data => setTopTrack( { data, loading: true, err: '' } ))
        .catch(err => setTopTrack( { data: {}, loading: false, err } ));
    }, [ search, token ] );
    
    return topTrack;
};

export const NewReleases = token => 
{
    const [ newReleases, setNewReleases] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetNewReleases( token ).then( data => setNewReleases( { data, loading: true, err: '' } ))
        .catch(err => setNewReleases( { data: [], loading: false, err } ));
    }, [ token ] );
    
    return newReleases;
};

export const RelatedArtist = (search, token) => 
{
    const [ related, setRelated ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetRelatedArtist( search, token ).then( data => setRelated( { data, loading: true, err: '' } ))
        .catch(err => setRelated( { data: [], loading: false, err } ));
    }, [ search, token ] );

    return related;
};

export const Appears_On = (search, token) => 
{
    const [ appear, setAppear ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetAppears_on( search, token ).then( data => setAppear( { data, loading: true, err: '' } ))
        .catch(err => setAppear( { data: [], loading: false, err } ));
    }, [ search, token ] );

    return appear;
};

export const UserProfile = (token) => 
{
    const [ user, setUser ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetUserProfile( token ).then( data => setUser( { data, loading: true, err: '' } ))
        .catch(err => setUser( { data: [], loading: false, err } ));
    }, [ token ] );

    return user;
};

export const UserRecentlyPlayed = (token) => 
{
    const [ recentlyPlayed, setRecentlyPlayed ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetUserRecentlyPlayed( token ).then( data => setRecentlyPlayed( { data, loading: true, err: '' } ))
        .catch(err => setRecentlyPlayed( { data: [], loading: false, err } ));
    }, [ token ] );

    return recentlyPlayed;
};

export const SpecifiedPlaylist = ( playlistId, token, uriRemove) => 
{
    const [ playlist, setPlaylist ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetSpecifiedPlaylist( playlistId, token ).then( data => setPlaylist( { data, loading: true, err: '' } ))
        .catch(err => setPlaylist( { data: [], loading: false, err } ));
    }, [ playlistId, token, uriRemove ] );

    return playlist;
};

export const BrowseCategories = (token) => 
{
    const [ genre, setGenre ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetBrowseCategories( token ).then( data => setGenre( { data, loading: true, err: '' } ))
        .catch(err => setGenre( { data: [], loading: false, err } ));
    }, [ token ] );

    return genre;
};

export const CategoryPlaylist = ( id, token ) => 
{
    const [ category, setCategory ] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetCategoryPlaylist( id, token ).then( data => setCategory( { data, loading: true, err: '' } ))
        .catch(err => setCategory( { data: [], loading: false, err } ));
    }, [ id, token ] );

    return category;
};

export const LikedSongsApi = ( token, idliked, idliked2 ) => 
{
    const [ liked, setLiked] = useState({
        data: [],
        loading: false,
        err: ''
    });

    useEffect( () => {
        GetLikedSongs( token ).then( data => setLiked( { data, loading: true, err: '' } ))
        .catch(err => setLiked( { data: [], loading: false, err } ));
    }, [ token, idliked, idliked2 ] );

    return liked;
};

export const DeleteLikedSongApi = ( idliked, idliked2, token ) => 
{
    const [ deleteLiked, setDeleteLiked] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        DeleteLikedSong( idliked2, token ).then( data => setDeleteLiked( { data, loading: true, err: '' } ))
        .catch(err => setDeleteLiked( { data: {}, loading: false, err } ));
    }, [ idliked2 ] );

    return deleteLiked;
};

export const SaveTracks = ( idliked, idliked2, token ) => 
{
    const [ saveTrack, setSaveTrack] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        PutSaveTracks( idliked, token ).then( data => setSaveTrack( { data, loading: true, err: '' } ))
        .catch(err => setSaveTrack( { data: {}, loading: false, err } ));
    }, [ idliked ] );
    return saveTrack;
};

export const AddPlaylist = ( id, token, name, description, state ) => 
{
    const [ playlist, setPlaylist] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        PostPlaylist( id, token, name, description, state ).then( data => setPlaylist( { data, loading: true, err: '' } ))
        .catch(err => setPlaylist( { data: {}, loading: false, err } ));
    }, [ id, token, name, description, state ] );

    return playlist;
};

export const UpdatePlaylist = ( id, token, name, description, state ) => 
{
    const [ playlist, setPlaylist] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        PutPlaylist( id, token, name, description, state ).then( data => setPlaylist( { data, loading: true, err: '' } ))
        .catch(err => setPlaylist( { data: {}, loading: false, err } ));
    }, [ id, token, name, description, state ] );

    return playlist;
};

export const AddToPlaylist = ( id, token, uri ) => 
{
    const [ playlist, setPlaylist] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        AddItemToPlaylist( id, token, uri ).then( data => setPlaylist( { data, loading: true, err: '' } ))
        .catch(err => setPlaylist( { data: {}, loading: false, err } ));
    }, [ id, token, uri ] );

    return playlist;
};
export const RemoveToPlaylist = ( id, token, uri ) => 
{
    const [ playlist, setPlaylist] = useState({
        data: {},
        loading: false,
        err: ''
    });

    useEffect( () => {
        RemoveItemToPlaylist( id, token, uri ).then( data => setPlaylist( { data, loading: true, err: '' } ))
        .catch(err => setPlaylist( { data: {}, loading: false, err } ));
    }, [ id, token, uri ] );

    return playlist;
};






