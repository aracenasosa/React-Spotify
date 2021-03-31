import React from 'react';
import Style from './RecentlyPlayed.module.css';
import {Link} from 'react-router-dom';
import User from '../../../assets/user.jpeg';
import {SpecificArtist} from '../../../hooks/hook';   

const RecentlyPlayed = ({recentlyPlayed, token}) => {

    const { data, loading, err } = SpecificArtist( recentlyPlayed.track.artists ? recentlyPlayed.track.artists[0].id : '', token);

    return (
        <section className={Style.marginContainer}>
            <a href={`/album/${recentlyPlayed.track.album ? recentlyPlayed.track.album.id : ''}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                <section className={Style.card}>
                <img className={Style.artistImg} src={data && data.images ? data.images[0].url : User} alt={data ? data.name : ''} />

                    <h4>{recentlyPlayed.track.artists ? recentlyPlayed.track.artists[0].name.substring(0, 14) : ''} <span style={{ display: recentlyPlayed.track.artists ? recentlyPlayed.track.artists[0].name.length > 14 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>

                    <p>{recentlyPlayed.track ? recentlyPlayed.track.name.substring(0, 20) : ''} <span style={{ display: recentlyPlayed.track ? recentlyPlayed.track.name.length > 20 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></p>

                </section>
            </a>
        </section >
    )
}

export default RecentlyPlayed
