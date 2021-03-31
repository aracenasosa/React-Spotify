import React from 'react';
import Style from './Playlist.module.css';
import {Link} from 'react-router-dom';
import User from '../../../assets/user.jpeg';

const Playlist = ({playlist}) => {
    return (
        <section className={Style.marginContainer}>
        <a href={`/playlist/${playlist.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
            <section className={Style.card}>
            <img className={Style.artistImg} src={playlist.images && playlist.images.length > 0 ? playlist.images[0].url : User} alt={playlist ? playlist.name : ''} />

                <h4>{playlist ? playlist.name.substring(0, 20) : ''} <span style={{ display: playlist ? playlist.name.length > 20 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>

                <p>By {playlist.owner ? playlist.owner.display_name: ''}</p>

            </section>
        </a>
    </section >
    )
}

export default Playlist
