import React from 'react';
import Style from './NewRelease.module.css';
import User from '../../../assets/user.jpeg';
import { Link } from 'react-router-dom';

const NewReleases = ({ release }) => {
    return (
        <section className={Style.marginContainer}>
            <a href={`/album/${release ? release.id : ''}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                <section className={Style.card}>
                    <img className={Style.artistImg} src={release.images[0] ? release.images[0].url : User} alt={release.name} />

                    <h4>{release.name ? release.name.substring(0, 14) : ''} <span style={{ display: release.name.length > 14 ? 'inline' : 'none', color: '#fff' }}>...</span></h4>

                    <p>{release.artists[0] ? release.artists[0].name.substring(0, 20) : ''} <span style={{ display: release.artists[0] ? release.artists[0].name.length > 20 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></p>

                </section>
            </a>
        </section >
    )
}

export default NewReleases
