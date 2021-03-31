import React from 'react';
import Style from './Album.module.css';
import User from '../../../assets/user.jpeg';
import { Link } from 'react-router-dom';

const Album = ({ album }) => {

    
    return (
        <section className={Style.marginContainer}>
             <Link to={`/album/${album.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
            <section className={Style.card}>
                <img className={Style.artistImg} src={album.images[0] ? album.images[0].url : User} alt={album.name} />

                <h4>{album.name ? album.name.substring(0, 14) : ''} <span style={{ display: album.name.length > 14 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>


                <p>{album.artists ? album.artists[0].name : ''}</p>

            </section>
            </Link>
        </section>
    )
}

export default Album
