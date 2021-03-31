import React from 'react';
import Style from './FeaturedPlaylist.module.css';
import User from '../../../assets/user.jpeg';
import {Link} from 'react-router-dom';

const FeaturedPlaylist = ({ playlist }) => {
    return (
        <section className={Style.marginContainer}>
            <a href={`/playlist/${playlist ? playlist.id : ''}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                <section className={Style.card}>
                    <img className={Style.artistImg} src={playlist.images[0] ? playlist.images[0].url : User} alt={playlist.name} />

                    <h4>{playlist.name ? playlist.name.substring(0, 14) : ''} <span style={{ display: playlist.name.length > 14 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>

                    <p>By {playlist.owner.display_name ? playlist.owner.display_name.substring(0, 20) : ''}<span style={{ display: playlist.owner ? playlist.owner.display_name.length > 20 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></p>

                </section>
            </a>
        </section>
    )
}

export default FeaturedPlaylist
