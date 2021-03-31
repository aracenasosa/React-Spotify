import React from 'react';
import Style from './Playlist.module.css';
import { Link } from 'react-router-dom';
import User from '../../../assets/user.jpeg';
import { RemovePlaylist } from '../../../hooks/hook';
import axios from 'axios';

const Playlist = ({ playlist, tokenAuth }) => {

    //console.log(playlist);

    return (
        <section className={Style.marginContainer}>
            <section className={Style.card}>
                <img className={Style.artistImg} src={playlist.images && playlist.images.length > 0 ? playlist.images[0].url : User} alt={playlist ? playlist.name : ''} />

                <h4>{playlist ? playlist.name.substring(0, 19) : ''} <span style={{ display: playlist ? playlist.name.length > 19 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>

                <div className={Style.flex}>
                    <a className={Style.btnEdit} href={`/editPlaylist/${playlist.id}/${localStorage.getItem('token')}`}>Edit</a>
                </div>

            </section>
        </section >
    )
}

export default Playlist
