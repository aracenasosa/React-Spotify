import React, { useState } from 'react';
import { SpecifiedPlaylist, UserPlaylist, AddToPlaylist, RemoveToPlaylist, UserProfile } from '../../../hooks/hook';
import Style from './Playlist.module.css';
import Nav from '../Nav';
import Left from '../../../assets/left.svg';
import Right from '../../../assets/right.svg';
import User from '../../../assets/user.jpeg';
import Song from './Song/Song';
import Reloj from '../../../assets/reloj.svg';
import CountUp from 'react-countup';
import arrowUp from '../../../assets/arrowUp.svg';
import arrowDown from '../../../assets/arrowDown.svg';
import { Link } from 'react-router-dom';

const Playlist = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, match: { params: { id } }, token, tokenAuth }) => {

    const [idliked, setId] = useState('');
    const [idliked2, setId2] = useState('');
    const { data: userPlaylist, loadinguserPlaylist, erruserPlaylist } = UserPlaylist(tokenAuth);

    const [playlist, setPlaylist] = useState({
        id: '',
        uri: ''
    });
    const [uriRemove, setUriRemove] = useState('');
    const { data, loading, err } = SpecifiedPlaylist(id, tokenAuth, uriRemove);
    const totalTime = data.tracks && data.tracks.items.length > 0 ? data.tracks.items.map(obj => obj.track ? obj.track.duration_ms : 0).reduce((a, b) => a + b) : 0;
    const hours = Math.floor((totalTime / 60000) / 60).toFixed(0);
    const minutes = Math.floor(totalTime / 60000).toFixed(0);
    const seconds = ((totalTime % 60000) / 1000).toFixed(0);

    const { data: addPlaylist, loadingaddPlaylist, erraddPlaylist } = AddToPlaylist(playlist.id, tokenAuth, playlist.uri);
    const { data: removePlaylist, loadingremovePlaylistt, errremovePlaylist } = RemoveToPlaylist(id, tokenAuth, uriRemove);
    const [arrow, setArrow] = useState(false);
    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);
    /* console.log(id, 'id');
    console.log(loading, 'loading');
    console.log(data, 'data'); */
    console.log(uriRemove, 'uriRemove');

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
            <section className={Style.playlist} style={{ height: data.tracks ? data.tracks.items.length > 5 ? '100%' : '100vh' : '100vh' }}>

                <header className={Style.header} >
                    <section className={Style.overlay}>
                        <section className={Style.innerText}>
                            <div className={Style.arrows}>
                                <section className={Style.leftRight}>
                                    <img src={Left} alt="left img" />
                                    <img src={Right} alt="right img" />
                                </section>

                                <section className={Style.section_0}>
                                    <section className={Style.user} onClick={() => setArrow(!arrow)} style={{ background: arrow ? 'rgba(151,151,151, .3)' : '', width: user.display_name !== undefined ? user.display_name.length > 16 ? '220px' : '200px' : '' }}>
                                        <img className={Style.userImg} src={user.images && user.images.length > 0 ? user.images[0].url : User} alt={user.display_name} />
                                        <p>{user.display_name ? user.display_name.substring(0, 16) : 'Not Available'} <span style={{ display: user.display_name && user.display_name !== undefined ? user.display_name.length > 16 ? 'inline' : 'none' : 'none', color: '#fff' }}>...</span></p>
                                        <img className={Style.arrow} src={arrow ? arrowUp : arrowDown} alt={user.display_name} />
                                    </section>
                                    <div className={Style.modal} style={{ display: arrow ? 'block' : 'none' }}>
                                        <Link to={`/userProfile/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                            <p>Account</p>
                                        </Link>
                                        <p>Profile</p>
                                        <hr className={Style.hr} />
                                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                                            <p>Log out</p>
                                        </Link>
                                    </div>
                                </section>
                            </div>

                            <div className={Style.content}>
                                <img src={data.images && data.images.length > 0 ? data.images[0].url : User} className={Style.playlistImg} />
                                <div className={Style.textContainer}>
                                    <p className={Style.type}>{data && data.collaborative ? 'COLLABORATIVE PLAYLIST' : 'PLAYLIST'}</p>
                                    <h1>{data ? data.name : ''}</h1>
                                    <p className={Style.description}>{data ? data.description : ''}</p>
                                    <div className={Style.text}>
                                        <p className={Style.name}>{data.owner ? data.owner.display_name : ''}</p>
                                        <div className={data.followers && data.followers.total > 0 ? Style.circle : ''}></div>
                                        <p className={Style.colorLight} style={{ display: data.followers && data.followers.total > 0 ? 'inline-block' : 'none' }}>
                                            <CountUp
                                                start={0}
                                                end={data.followers && data.followers.total > 0 ? data.followers.total : ''}
                                                duration={3}
                                                separator=","
                                            />
                                            {data.followers && data.followers.total > 0 ? data.followers.total > 1 ? ' likes' : ' like' : ''}
                                        </p>
                                        <div className={Style.circle} style={{ display: data.tracks ? data.tracks.total > 0 ? 'block' : 'none' : '' }}></div>
                                        <p className={Style.colorLight} style={{ display: data.tracks ? data.tracks.total > 0 ? 'block' : 'none' : '' }}>
                                            <CountUp
                                                start={0}
                                                end={data.tracks ? data.tracks.total : ''}
                                                duration={3}
                                                separator=","
                                            />
                                            {data.tracks && data.tracks.total > 1 ? ' songs' : ' song'},
                                        </p>
                                        <p className={Style.colorLight2} style={{ display: data.tracks ? data.tracks.total > 0 ? 'block' : 'none' : '' }}>{data.tracks ? `${minutes > 59 ? hours : minutes} ${minutes > 59 ? 'hr' : 'min'} ${minutes > 59 ? minutes - 60 < 10 ? `0${minutes - 60}` : minutes - (hours * 60) : ''} ${minutes > 59 ? '' : seconds < 10 ? `0${seconds}` : seconds} ${minutes > 59 ? 'min' : 'sec'}` : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </header>

                <section className={Style.section_a}>
                    <table>
                        <th className={Style.normaChild}>#</th>
                        <th className={Style.normaChild}>TITLE</th>
                        <th className={Style.normaChild}>ALBUM</th>
                        <th className={Style.normaChild} style={{ display: data ? data.collaborative ? '' : 'none' : 'none' }}>ADDED BY</th>
                        <th className={Style.normaChild}>DATE ADDED</th>
                        <th className={Style.lastChild}><img src={Reloj} alt="Reloj img" /></th>
                        {data.tracks && data.tracks.items && data.tracks.items.length > 0 ? data.tracks.items.map((song, idx) =>
                            <Song
                                song={song}
                                idx={idx}
                                collaborative={data.collaborative}
                                tokenAuth={tokenAuth}
                                userPlaylist={userPlaylist}
                                setPlaylist={setPlaylist}
                                playlist={data}
                                setId={setId}
                                setId2={setId2}
                                idliked={idliked}
                                idliked2={idliked2}
                                setUriRemove={setUriRemove}
                            />
                        ) : ''}
                    </table>
                </section>

            </section>

        </main>
    )
}

export default Playlist
