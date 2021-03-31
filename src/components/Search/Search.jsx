import { React, useState, useEffect } from 'react';
import { Artists, Track, ObtainAlbum, FeaturedPlaylist, BrowseCategories, DeleteLikedSongApi, UserPlaylist, AddToPlaylist, UserProfile, SaveTracks } from '../../hooks/hook';
import ArtistsCards from './ArtistsCards/ArtistsCards';
import Album from './Album/Album';
import FeaturedPlaylistcp from './FeaturedPlaylist/FeaturedPlaylistcp';
import Song from './Songs/Songs';
import Style from './Search.module.css';
import Nav from './Nav/Nav';
import User from '../../assets/user.jpeg';
import cx from 'classnames';
import Genre from '../../assets/genre.svg';
import { Link } from 'react-router-dom';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import { toast } from 'react-toastify';
toast.configure();

const Search = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, token, match: { params: { id } }, history, location, match, search, setSearch, tokenAuth }) => {

    const { data, loading, err } = Artists(search, token);
    const { data: track, loading: loadingTrack, err: errTrack } = Track(search, token);
    const { data: album, loading: loadingAlbum, err: errAlbum } = ObtainAlbum(data[0] ? data[0].id : '', token);
    const { data: playlist, loading: loadingPlaylist, err: errPlaylist } = FeaturedPlaylist(token);
    const { data: browseCategories, loading: loadingBrowseCategories, err: errBrowseCategories } = BrowseCategories(token);
    const [idliked, setId] = useState('');
    const [idliked2, setId2] = useState('');
    const { data: saveTracks, loading: saveTracksLoading, err: errsaveTracks } = SaveTracks(idliked, idliked2, tokenAuth);
    const { data: deleteLiked, loading: deleteLikedLoading, err: errLikedLoading } = DeleteLikedSongApi(idliked, idliked2, tokenAuth);
    const { data: userPlaylist, loadinguserPlaylist, erruserPlaylist } = UserPlaylist(tokenAuth);
    const [playlistData, setPlaylist] = useState({
        id: '',
        uri: ''
    });
    const { data: addPlaylist, loadingaddPlaylist, erraddPlaylist } = AddToPlaylist(playlistData.id, tokenAuth, playlistData.uri);
    const [arrow, setArrow] = useState(false);
    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);

    /* if(localStorage.getItem('previousLocation') !== match.url) 
    {
        localStorage.setItem('currentLocation', match.url)
    } 

    console.log(localStorage.getItem('compare'), 'compare');

    console.log(localStorage.getItem('currentLocation'), 'currentLocation');
    console.log(localStorage.getItem('previousLocation'), 'previousLocation'); */

    const removed = () => toast.info('Remove from your Liked Songs', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
    const success = () => toast.info('Added to your Liked Songs', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
    const playlistToast = () => toast.info('Added to playlist', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });

    useEffect(() => {
        if (saveTracks.status === 200) {
            success();
        }
    }, [saveTracks])

    useEffect(() => {
        if (deleteLiked.status === 200) {
            removed();
        }
    }, [deleteLiked])

    useEffect(() => {
        if (addPlaylist.status === 201) {
            playlistToast();
        }
    }, [addPlaylist])

    return (
        <main className={Style.container}>
            <section>
                <Nav
                    stateLink={stateLink}
                    setStateLink={setStateLink}
                    stateLink2={stateLink2}
                    setStateLink2={setStateLink2}
                    stateLink3={stateLink3}
                    setStateLink3={setStateLink3}
                    id={id}
                    token={token}
                    tokenAuth={tokenAuth}
                />
            </section>

            <section className={Style.search}>

                <section className={Style.topContainer}>
                    <form >
                        <input type="text" placeholder="Search for Artists" onChange={ e => {setSearch(e.target.value); e.preventDefault();} } />

                        <section className={Style.section_0}>
                            <section className={Style.user} onClick={() => setArrow(!arrow)} style={{ background: arrow ? 'rgba(151,151,151, .3)' : '', width: user.display_name !== undefined ? user.display_name.length > 16 ? '210px' : '196px' : '' }}>
                                <img className={Style.userImg} src={user.images && user.images.length > 0 ? user.images[0].url : User} alt={user.display_name} />
                                <p>{user.display_name ? user.display_name.substring(0, 16) : 'Not Available'} <span style={{ display: user.display_name && user.display_name !== undefined ? user.display_name.length > 16 ? 'inline' : 'none' : 'none', color: '#fff' }}>...</span></p>
                                <img className={Style.arrow} src={arrow ? arrowUp : arrowDown} alt={user.display_name} />
                            </section>
                            <div className={Style.modal} style={{ display: arrow ? 'block' : 'none' }}>
                                <a href={`/userProfile/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                    <p>Account</p>
                                </a>
                                <hr className={Style.hr} />
                                <Link to={`/`} style={{ textDecoration: 'none' }}>
                                    <p>Log out</p>
                                </Link>
                            </div>

                        </section>
                    </form>
                </section>

                {loading && loadingTrack && loadingPlaylist && loadingAlbum ?
                    <section>

                        <section className={Style.section_a}>

                            <section className={Style.flex}>

                                <section className={Style.topContainer}>
                                    <h2 className={Style.h2}>Top result</h2>
                                    <Link to={`/artist/${data && data.length > 0 ? data[0].id : ''}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                        <section className={Style.card}>
                                            <img className={Style.artistImg} src={data[0] && data[0].images[0] ? data[0].images[0].url : User} alt={data[0]} />

                                            <h4>{data[0] ? data[0].name.substring(0, 21) : ''} <span style={{ display: data[0] ? data[0].name.length > 21 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>

                                            <div>
                                                <p>{data[0] ? data[0].type : ''}</p>
                                            </div>
                                        </section>
                                    </Link>
                                </section>

                                <section className={Style.songsContainer}>
                                    <h2 className={Style.h2Songs}>Songs</h2>
                                    <section className={Style.song}>
                                        {track ? track.map(song => <Song
                                            idliked={idliked}
                                            idliked2={idliked2}
                                            setId={setId}
                                            setId2={setId2}
                                            song={song}
                                            tokenAuth={tokenAuth}
                                            userPlaylist={userPlaylist}
                                            setPlaylist={setPlaylist}
                                            key={song.id} />).slice(0, 4) : <p style={{color: '#fff'}}>Not Data Available</p>}
                                    </section>
                                </section>

                            </section>
                        </section>

                        <section className={Style.section_b} style={{ display: data.length > 0 ? 'block' : 'none' }}>
                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>Artists</h2>
                                <a href={`/allArtist/${localStorage.getItem('token')}/${search}`} style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: data && data.length > 8 ? 'flex' : 'none' }}>See All</p>
                                </a>
                            </div>
                            <div className={Style.section_b_grid}>
                                {data ? data.map(artist => <ArtistsCards artist={artist} key={data.name} />).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </div>
                        </section>

                        <section className={Style.section_c} style={{ display: album.length > 0 ? 'block' : 'none' }}>
                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>Album</h2>
                                <a href={`/allAlbum/${data[0] ? data[0].id : ''}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: data && data.length > 8 ? 'flex' : 'none' }}>See All</p>
                                </a>
                            </div>
                            <div className={Style.section_c_grid}>
                                {album ? album.map((albm, idx) => <Album album={albm} key={idx} />).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </div>
                        </section>

                        <section className={Style.section_d} style={{ display: data.length > 0 ? 'block' : 'none' }}>
                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>Playlist</h2>
                                <a href={`/allFeaturedPlaylist/${localStorage.getItem('token')}/`} style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: data && data.length > 8 ? 'flex' : 'none' }}>See All</p>
                                </a>
                            </div>
                            <div className={Style.section_d_grid}>
                                {playlist ? playlist.map(play => <FeaturedPlaylistcp playlist={play} key={play.name} />).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </div>
                        </section>
                    </section>
                    :
                    <section>
                        <h2 className={Style.h2Category}>Browse Categories</h2>
                        <section className={Style.genreContainer}>
                            {browseCategories ? browseCategories.map(categories => (
                                <a href={`/browseCategories/${categories.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                    <section>
                                        <p>{categories ? categories.name.substring(0, 17) : ''} <span style={{ display: categories ? categories.name.length > 17 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></p>
                                        <img src={categories.icons ? categories.icons[0].url : Genre} alt={categories.name} className={Style.imgGenre} />
                                    </section>
                                </a>
                            )) : <p style={{color: '#fff'}}>Not Data Available</p>}
                        </section>

                    </section>
                }
            </section>
        </main>
    )
}

export default Search
