import React, { useState, useEffect } from 'react';
import Style from './Artist.module.css';
import { SpecificArtist, ArtistTopTrack, RelatedArtist, ObtainAlbum, Appears_On, SaveTracks, UserPlaylist, AddToPlaylist, DeleteLikedSongApi, UserProfile } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import Right from '../../assets/right.svg';
import Left from '../../assets/left.svg';
import verified from '../../assets/verified.svg';
import CountUp from 'react-countup';
import Nav from './Nav/Nav';
import { Link } from 'react-router-dom';
import Song from './Song/Song';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
toast.configure();

const Artist = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, match: { params: { id } }, history, location, match, token, tokenAuth }) => {

    const { data, loading, err } = SpecificArtist(id, tokenAuth);
    const { data: topTrack, loadingTopTrack, errTopTrack } = ArtistTopTrack(id, tokenAuth);
    const { data: album, loading: loadingAlbum, err: errAlbum } = ObtainAlbum(id, tokenAuth);
    const { data: related, loading: loadingRelated, err: errRelated } = RelatedArtist(id, tokenAuth);
    const { data: appears, loading: loadingAppears, err: errAppears } = Appears_On(id, tokenAuth);
    const [idliked, setId] = useState('');
    const [idliked2, setId2] = useState('');
    const { data: saveTracks, loading: saveTracksLoading, err: errsaveTracks } = SaveTracks(idliked, idliked2, tokenAuth);
    const { data: deleteLiked, loading: deleteLikedLoading, err: errLikedLoading } = DeleteLikedSongApi(idliked, idliked2, tokenAuth);
    const [see, setSee] = useState(false);
    const [playlist, setPlaylist] = useState({
        id: '',
        uri: ''
    });
    const { data: userPlaylist, loadinguserPlaylist, erruserPlaylist } = UserPlaylist(tokenAuth);
    const { data: addPlaylist, loadingaddPlaylist, erraddPlaylist } = AddToPlaylist(playlist.id, tokenAuth, playlist.uri);

    const [arrow, setArrow] = useState(false);
    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);

    /*  if(localStorage.getItem('previousLocation') !== match.url) 
     {
         localStorage.setItem('currentLocation', match.url)
     } 
     
     localStorage.setItem('compare', match.url)  */

    /* if(localStorage.getItem('compare') !== localStorage.getItem('previousLocation')) 
    {

    } */


    /* console.log(localStorage.getItem('currentLocation'), 'currentLocation');
    console.log(localStorage.getItem('previousLocation'), 'previousLocation');
    console.log(localStorage.getItem('compare'), 'compare'); */

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
        <main className={Style.container} >

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

            <section className={Style.main} >

                <header className={Style.header} style={{
                    background: `url(${data.images ? data.images[0].url : User}) no-repeat center center/cover`
                }}>
                    <section className={Style.overlay}>
                        <section className={Style.innerText}>
                            <div className={Style.arrows}>

                                <section className={Style.leftRight}>
                                    <Link to={`/search/${localStorage.getItem('token')}`}>
                                       <img src={Left} alt="left img" />
                                    </Link>
                                    <img src={Right} alt="right img" style={{ display: 'none' }}/>
                                </section>

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

                            </div>
                            <div>
                                <img src={verified} alt={data.name} />
                                <span>Verified Artist</span>
                            </div>
                            <h1>{data ? data.name : ''}</h1>
                            <p>
                                <CountUp
                                    start={0}
                                    end={data.followers ? data.followers.total : 0}
                                    duration={2.5}
                                    separator=","
                                /> followers
                            </p>
                        </section>
                    </section>
                </header>

                <section className={Style.section_a}>
                    <h1>Popular</h1>
                    <section className={Style.songContainer}>
                        {topTrack.length > 0 ? topTrack.map((track, idx) => (
                            <Song track={track}
                                idx={idx}
                                userPlaylist={userPlaylist}
                                tokenAuth={tokenAuth}
                                idliked={idliked}
                                idliked2={idliked2}
                                setPlaylist={setPlaylist}
                                setId={setId}
                                setId2={setId2}
                                deleteLiked={deleteLiked} />
                        )).slice(0, see ? 10 : 5) : <p style={{color: '#fff'}}>Not Data Available</p>}

                        <h5 className={Style.see} onClick={() => setSee(!see)}>{see ? 'SEE LESS' : 'SEE MORE'}</h5>
                    </section>
                </section>

                <section className={Style.section_b}>
                    <h1>Discography</h1>
                    <section className={Style.discographyContainer}>
                        {album.length > 0 ? album.map(alb => (
                            <Link to={`/album/${alb.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                <section className={Style.discography}>
                                    <img className={Style.artistImg} src={alb.images[0] ? alb.images[0].url : User} alt={alb.name} />

                                    <h4 className={Style.title}>{alb.name ? alb.name.substring(0, 11) : ''} <span style={{ display: alb.name !== undefined ? alb.name.length > 11 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>

                                    <div className={Style.discograpyText}>
                                        <span>{new Date(alb.release_date).getFullYear()}</span>
                                        <div className={Style.circle}></div>
                                        <span> {alb.album_type}</span>
                                    </div>
                                </section>
                            </Link>
                        )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                    </section>
                </section>

                <section className={Style.section_c}>
                    <h1>Fans also like</h1>
                    <section className={Style.fansLikeContainer}>
                        {related.length > 0 ? related.map(relate => (
                            <a href={`/artist/${relate.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                <section className={Style.cardLike}>
                                    <img className={Style.imgLike} src={relate.images[0] ? relate.images[0].url : User} alt={relate.name} />

                                    <h4>{relate.name ? relate.name.substring(0, 15) : ''} <span style={{ display: relate.name.length > 15 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>

                                    <p> {relate.type}</p>
                                </section>
                            </a>
                        )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                    </section>
                </section>

                <section className={Style.section_d}>
                    <h1>Appears On</h1>
                    <section className={Style.appearContainer}>
                        {appears.length > 0 ? appears.map(appear => (
                            <Link to={`/album/${appear.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                <section className={Style.appear}>
                                    <img className={Style.appearImg} src={appear.images[0] ? appear.images[0].url : User} alt={appear.name} />

                                    <h4>{appear.name ? appear.name.substring(0, 15) : ''} <span style={{ display: appear.name.length > 15 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>

                                    <div className={Style.appearText}>
                                        <span>{new Date(appear.release_date).getFullYear()}</span>
                                        <div className={Style.circle}></div>
                                        <span> {appear.album_type}</span>
                                    </div>
                                </section>
                            </Link>
                        )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                    </section>
                </section>

            </section>

        </main>
    )
}

export default Artist
