import React from 'react';
import Style from './ArtistsCards.module.css';
import User from '../../../assets/user.jpeg';
import { Link } from 'react-router-dom';

const ArtistsCards = ({ artist }) => {
    return (
        <section className={Style.marginContainer}>
            <a href={`/artist/${artist.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                <section className={Style.card}>
                    <img className={Style.artistImg} src={artist.images[0] ? artist.images[0].url : User} alt={artist.name} />

                    <h4>{artist.name ? artist.name.substring(0, 14) : ''} <span style={{ display: artist.name.length > 14 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>

                    <div>
                        <p>{artist.type}</p>
                    </div>
                </section>
            </a>
        </section>
    )
}

export default ArtistsCards
