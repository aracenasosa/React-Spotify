import Style from './LikedSongs.module.css';
import { Link } from 'react-router-dom';
import User from '../../assets/user.jpeg';
import Left from '../../assets/left.svg';
import Right from '../../assets/right.svg';
import cx from 'classnames';
import React, { useState, useEffect } from 'react';
import Nav from './Nav/Nav';
import { LikedSongsApi, UserProfile, DeleteLikedSongApi, UserPlaylist, AddToPlaylist } from '../../hooks/hook';
import Heart from '../../assets/heart.svg';
import CountUp from 'react-countup';
import Song from './Song/Song';
import Reloj from '../../assets/reloj.svg';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import { toast } from 'react-toastify';
toast.configure();

const LikedSongs = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, match: { params: { id } }, token, tokenAuth }) => {

    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);
    const [idliked, setId] = useState('');
    const { data: deleteLiked, loading: deleteLikedLoading, err: errLikedLoading } = DeleteLikedSongApi(idliked, idliked, tokenAuth);
    const { data, loading, err } = LikedSongsApi(tokenAuth, idliked);
    const { data: userPlaylist, loadinguserPlaylist, erruserPlaylist } = UserPlaylist(tokenAuth);
    const [playlist, setPlaylist] = useState({
        id: '',
        uri: ''
    });
    const [arrow, setArrow] = useState(false);
    const { data: addPlaylist, loadingaddPlaylist, erraddPlaylist } = AddToPlaylist(playlist.id, tokenAuth, playlist.uri);

    const removed = () => toast.info('Remove from your Liked Songs', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });
    const playlistToast = () => toast.info('Added to playlist', { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000 });

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
            <section className={Style.liked} style={{ height: data ? data.length > 5 ? '105%' : '180vh' : '100vh' }}>

                <header className={Style.header} >
                    <section className={Style.overlay}>
                        <section className={Style.innerText}>
                            <div className={Style.arrows}>

                                <section className={Style.leftRight}>
                                    <Link to={`/home/${localStorage.getItem('token')}`}>
                                        <img src={Left} alt="left img" />
                                    </Link>
                                    <img src={Right} alt="right img" style={{ display: 'none' }} />
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
                                <img src={Heart} className={Style.heart} />
                                <div className={Style.textContainer}>
                                    <p className={Style.type}>PLAYLIST</p>
                                    <h1>Liked Songs</h1>
                                    <div className={Style.text}>
                                        <p className={Style.name}>{user ? user.display_name : ''}</p>
                                        <div className={Style.circle} style={{ display: data ? data.length > 0 ? 'block' : 'none' : '' }}></div>
                                        <p className={Style.colorLight} style={{ display: data ? data.length > 0 ? 'block' : 'none' : '' }}>
                                            <CountUp
                                                start={0}
                                                end={data ? data.length : ''}
                                                duration={3}
                                                separator=","
                                            />
                                            {data && data.length > 1 ? ' songs' : data.length === 1 ? ' song' : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </header>

                <section className={Style.section_a}>
                    <table>
                        <th className={cx(Style.normaChild, Style.number)}>#</th>
                        <th className={Style.normaChild}>TITLE</th>
                        <th className={cx(Style.normaChild, Style.albumTh)}>ALBUM</th>
                        <th className={cx(Style.normaChild, Style.date)}>DATE ADDED</th>
                        <th className={Style.lastChild}><img src={Reloj} alt="Reloj img" /></th>
                        {data && data.length > 0 ? data.map((song, idx) =>
                            <Song
                                song={song}
                                idx={idx}
                                collaborative={data.collaborative}
                                setId={setId}
                                tokenAuth={tokenAuth}
                                idliked={idliked}
                                userPlaylist={userPlaylist}
                                setPlaylist={setPlaylist}
                                userPlaylist={userPlaylist}
                            />) : <p style={{ color: '#fff' }}>Not Data Available</p>}
                    </table>

                    {data && data.length <= 0 ? <p style={{ color: '#fff', fontSize: '30px', textAlign: 'center', marginTop: '40px' }}>Not Data Available</p> : ''}
                </section>

            </section>

        </main>
    )
}

export default LikedSongs
