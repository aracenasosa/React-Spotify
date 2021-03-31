import React from 'react';
import Style from './Login.module.css';
import Spotify from '../../assets/spotifyIcon.svg';
import { clientId, redirectUri, scopes, authEndpoint } from './authorizeConf';

const Login = () => {

    localStorage.clear();

    return (
        <section className={Style.container}>
            <form className={Style.form}>
                <img className={Style.App_logo} src={Spotify} alt="Spotify Logo"/>
                <a href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    "%20"
                )}&response_type=token&show_dialog=true`}>LOG IN</a>
            </form>
        </section>
    )

}

export default Login
