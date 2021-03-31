import React, { useEffect, useState } from 'react';
import Style from './Nav.module.css';
import { Link } from 'react-router-dom';
import Logo from '../../assets/spotifyLogo.svg';
import Home from '../../assets/home.svg';
import Search from '../../assets/search.svg';
import Palito from '../../assets/palitos.svg';
import Cruz from '../../assets/cruz.svg';
import Heart from '../../assets/heart.svg';
import Collaborite from '../../assets/collaborite.svg';
import { UserPlaylist } from '../../hooks/hook';

function Nav({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, tokenAuth }) {

    const { data, loading, err } = UserPlaylist(tokenAuth);

    const link = {
        background: stateLink & stateLink2 === false & stateLink3 === false ? 'rgb(40,40,40)' : 'none'
    }

    const link2 = {
        background: stateLink2 & stateLink === false & stateLink3 === false ? 'rgb(40,40,40)' : 'none'
    }

    const link3 = {
        background: stateLink3 & stateLink === false & stateLink2 === false ? 'rgb(40,40,40)' : 'none'
    }

    const span = {
        color: stateLink & stateLink2 === false & stateLink3 === false ? '#fff' : 'none'
    }

    const span2 = {
        color: stateLink2 & stateLink === false & stateLink3 === false ? '#fff' : 'none'
    }

    const span3 = {
        color: stateLink3 & stateLink === false & stateLink2 === false ? '#fff' : 'none'
    }

    const [ menu, setMenu ] = useState(true);

    return (
        <nav className={Style.nav}>
            <section className={Style.container}>
                <div className={Style.logo}>
                    <img src={Logo} alt="Spotify Logo" />
                    <div className={Style.hamburguerMenu} onClick={() => setMenu(!menu)}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <ul className={Style.list} style={{display: menu ? 'block' : 'none'}}>
                    <Link to={`/home/${localStorage.getItem('token')}`} className={Style.Links} style={link} onClick={() => { setStateLink(true); setStateLink2(false); setStateLink3(false) }}>
                        <img src={Home} /> <span style={span} >Home</span>
                    </Link>
                    <Link to={`/search/${localStorage.getItem('token')}`} className={Style.Links} style={link2} onClick={() => { setStateLink2(true); setStateLink(false); setStateLink3(false) }}>
                        <img src={Search} /> <span style={span2} >Search</span>
                    </Link>
                    <Link to={`/playlists/${localStorage.getItem('token')}`} className={Style.Links} style={link3} onClick={() => { setStateLink3(true); setStateLink(false); setStateLink2(false) }}>
                        <img src={Palito} /> <span style={span3} >Your Library</span>
                    </Link>
                </ul>

                <section className={Style.playlist} style={{display: menu ? 'block' : 'none'}}>
                    <h3>PLAYLISTS</h3>
                    <ul className={Style.playlistList}>
                        <Link to={`/createPlaylist/${localStorage.getItem('token')}`} className={Style.playlistLinks} onClick={() => { setStateLink2(false); setStateLink(false); setStateLink3(false) }}>
                            <img src={Cruz} className={Style.cruz} /> <span>Create Playlist</span>
                        </Link>
                        <Link to={`/likedSongs/${localStorage.getItem('token')}`} className={Style.playlistLinks} onClick={() => { setStateLink2(false); setStateLink(false); setStateLink3(false) }}>
                            <img src={Heart} className={Style.heart} /> <span >Liked Songs</span>
                        </Link>
                    </ul>
                </section>

                <hr className={Style.hr} />

                <section className={Style.userPlaylist}>
                    {data ? data.map(playlist => (
                        <a href={`/playlist/${playlist.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }} key={playlist ? playlist.name : ''} onClick={() => { setStateLink2(false); setStateLink(false); setStateLink3(false) }}>
                            <div className={Style.card}>
                                <p className={Style.playlistName}>{playlist.name ? playlist.name.substring(0, 25) : ''} <span style={{ display: playlist.name !== undefined ? playlist.name.length > 25 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></p>
                                <img className={Style.collaborativeImg} style={{ display: playlist.collaborative ? 'inline-block' : 'none' }} src={Collaborite} alt="Collaborite" />
                            </div>
                        </a>
                    )).slice(0, data.length > 7 ? 7 : data.length) : ''}
                    <a href={`/playlists/${localStorage.getItem('token')}`} style={{textDecoration: 'none'}} onClick={() => { setStateLink2(false); setStateLink(false); setStateLink3(false) }}>
                        <p className={Style.seeAll} style={{ display: data.length > 7 ? 'block' : 'none' }}>See All</p>
                    </a>
                </section>
            </section>
        </nav>
    )
}

export default Nav
