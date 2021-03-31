import './App.css';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import {
  Home,
  Search,
  Login,
  Artist,
  SpecificAlbum,
  Playlist,
  AllPlaylist,
  BrowseCategories,
  LikedSongs,
  AllRecentlyPlayed,
  AllNewRelease,
  AllFeaturedPlaylist,
  AllArtist,
  AllAlbum,
  CreatePlaylist,
  CreatePlaylistForm,
  EditPlaylist,
  UserProfile
}
  from './components/components';
import React, { useState, useEffect } from 'react';
import { GetToken } from './helpers/helper';

const App = () => {

  const [stateLink, setStateLink] = useState(false);
  const [stateLink2, setStateLink2] = useState(false);
  const [stateLink3, setStateLink3] = useState(false);
  const [search, setSearch] = useState('');
  const [tokenAuth, setTokenAuth] = useState('');
  let token = GetToken(search);

  const hash = window.location.hash.split('=');
  const nameParam = hash.length > 3 ? hash[3].split('/')[hash[3].split('/').length - 1] : '';
  //console.log(nameParam, 'hash');

  useEffect(() => {
    setTokenAuth(hash[1]);
    localStorage.setItem('token', window.location.hash)
  }, [window.location.hash]);

  if (window.location.search.split('=')[1] === 'access_denied') {
    return <Router><Redirect to='/' /></Router>
  }
  else {
    return (
      <div className="App">
        <Router>
          <Switch>

            <Route exact path="/" render={props => <Login {...props}
              token={token}
            />} />

            <Route exact path="/home/" render={props => <Home {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/search/" render={props => <Search {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              search={search}
              setSearch={setSearch}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/artist/:id/" render={props => <Artist {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/album/:id/" render={props => <SpecificAlbum {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/playlist/:id/" render={props => <Playlist {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/playlists/" render={props => <AllPlaylist {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/browseCategories/:id/" render={props => <BrowseCategories {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/likedSongs/" render={props => <LikedSongs {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/allRecentlyPlayed/" render={props => <AllRecentlyPlayed {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/allNewRelease/" render={props => <AllNewRelease {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/allFeaturedPlaylist/" render={props => <AllFeaturedPlaylist {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/allArtist/" render={props => <AllArtist {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
              searchParam={nameParam}
            />} />

            <Route exact path="/allAlbum/:id/" render={props => <AllAlbum {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/createPlaylist/" render={props => <CreatePlaylist {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/createPlaylistForm/" render={props => <CreatePlaylistForm {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

            <Route exact path="/editPlaylist/:id/" render={props => <EditPlaylist {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

             <Route exact path="/userProfile/" render={props => <UserProfile {...props}
              stateLink={stateLink}
              setStateLink={setStateLink}
              stateLink2={stateLink2}
              setStateLink2={setStateLink2}
              stateLink3={stateLink3}
              setStateLink3={setStateLink3}
              token={token}
              tokenAuth={tokenAuth}
            />} />

          </Switch>

        </Router>
      </div>
    );
  }

}

export default App;
