import React, { useState, useEffect } from 'react';
import Style from './SpecificAlbum.module.css';
import Nav from './Nav/Nav';
import { Album, SpecificArtist, ObtainAlbum, SaveTracks, DeleteLikedSongApi, AddToPlaylist, UserPlaylist, UserProfile } from '../../hooks/hook';
import Right from '../../assets/right.svg';
import Left from '../../assets/left.svg';
import User from '../../assets/user.jpeg';
import Reloj from '../../assets/reloj.svg';
import CountUp from 'react-countup';
import Song from './Song/Song';
import { Link } from 'react-router-dom';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import cx from 'classnames';
import { toast } from 'react-toastify';
toast.configure();

const SpecificAlbum = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, match: { params: { id } }, token, tokenAuth }) => {

    const { data, loading, err } = Album(id, tokenAuth);
    const { data: artist, loadingArtist, errArtist } = SpecificArtist(data.artists ? data.artists[0].id : '', tokenAuth);
    const { data: album, loading: loadingAlbum, err: errAlbum } = ObtainAlbum(data.artists ? data.artists[0].id : '', tokenAuth);
    const [idliked, setId] = useState('');
    const [idliked2, setId2] = useState('');
    const { data: saveTracks, loading: saveTracksLoading, err: errsaveTracks } = SaveTracks(idliked, idliked2, tokenAuth);
    const { data: deleteLiked, loading: deleteLikedLoading, err: errLikedLoading } = DeleteLikedSongApi(idliked, idliked2, tokenAuth);
    const { data: userPlaylist, loadinguserPlaylist, erruserPlaylist } = UserPlaylist(tokenAuth);

    const totalTime = data.tracks ? data.tracks.items.map(obj => obj.duration_ms).reduce((a, b) => a + b) : 0;

    const hours = Math.floor((totalTime / 60000) / 60).toFixed(0);
    const minutes = Math.floor(totalTime / 60000).toFixed(0);
    const seconds = ((totalTime % 60000) / 1000).toFixed(0);
    const [playlist, setPlaylist] = useState({
        id: '',
        uri: ''
    });
    const { data: addPlaylist, loadingaddPlaylist, erraddPlaylist } = AddToPlaylist(playlist.id, tokenAuth, playlist.uri);
    const [arrow, setArrow] = useState(false);
    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);

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
            <section className={Style.main} >

                <header className={Style.header} >
                    <section className={Style.overlay}>
                        <section className={Style.innerText}>
                            <div className={Style.arrows}>

                                <section className={Style.leftRight}>
                                    <img src={Left} alt="left img" />
                                    <img src={Right} alt="right img" />
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
                            <div className={Style.content}>
                                <img src={data.images ? data.images[0].url : User} className={Style.albumImg} />
                                <div className={Style.textContainer}>
                                    <p className={Style.type}>{data.album_type}</p>
                                    <h1>{data ? data.name : ''}</h1>
                                    <div className={Style.text}>
                                        <img src={artist.images ? artist.images[0].url : User} className={Style.profileImg} />
                                        <p className={Style.name}>{data.artists ? data.artists[0].name : ''}</p>
                                        <div className={Style.circle}></div>
                                        <p className={cx(Style.colorLight, Style.date)}>{new Date(data.release_date).getFullYear()}</p>
                                        <div className={Style.circle}></div>
                                        <p className={Style.colorLight}>{data.total_tracks} songs,</p>
                                        <p className={Style.colorLight}>{data.tracks ? `${minutes > 59 ? hours : minutes} ${minutes > 59 ? 'hr' : 'min'} ${minutes > 59 ? minutes - 60 < 10 ? `0${minutes - 60}` : minutes - (hours * 60) : ''} ${minutes > 59 ? '' : seconds < 10 ? `0${seconds}` : seconds} ${minutes > 59 ? 'min' : 'sec'}` : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </header>


                {loading ?
                    <section>
                        <section className={Style.section_a}>
                            <table>
                                <th className={cx(Style.normaChild, Style.number)}>#</th>
                                <th className={Style.normaChild}>TITLE</th>
                                <th className={Style.lastChild}><img src={Reloj} alt="Reloj img" /></th>
                                {data.tracks ? data.tracks.items.map((song, idx) =>
                                    <Song
                                        tokenAuth={tokenAuth}
                                        song={song}
                                        idx={idx}
                                        userPlaylist={userPlaylist}
                                        setPlaylist={setPlaylist}
                                        setId2={setId2}
                                        setId={setId}
                                        idliked={idliked}
                                        idliked2={idliked2}
                                    />) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </table>
                        </section>

                        <section className={Style.section_b}>
                            <div className={Style.titleContainer}>
                                <h1>More by {data.artists ? data.artists[0].name : ''}</h1>
                                <a href={`/allAlbum/${data && data.artists ? data.artists[0].id : ''}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: album && album.length > 8 ? 'block' : 'none' }}>See All</p>
                                </a>
                            </div>
                            <section className={Style.albumContainer}>
                                {album ? album.map(alb => (
                                    <a href={`/album/${alb.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                        <section className={Style.album}>
                                            <img className={Style.artistImg} src={alb.images[0] ? alb.images[0].url : User} alt={alb.name} />

                                            <h4>{alb.name ? alb.name.substring(0, 15) : ''} <span style={{ display: alb.name.length > 15 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>

                                            <div className={Style.albumText}>
                                                <span>{new Date(alb.release_date).getFullYear()}</span>
                                                <div className={Style.circleCard}></div>
                                                <span> {alb.album_type}</span>
                                            </div>
                                        </section>
                                    </a>
                                )).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </section>
                        </section>
                    </section>
                    : <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i>}

            </section>

        </main >
    )
}

export default SpecificAlbum
