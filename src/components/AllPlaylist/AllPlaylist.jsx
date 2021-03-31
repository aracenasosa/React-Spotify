import React, { useState } from 'react';
import Nav from './Nav/Nav';
import Style from './AllPlaylist.module.css';
import { UserPlaylist, UserProfile } from '../../hooks/hook';
import Playlist from './Playlist/Playlist';
import User from '../../assets/user.jpeg';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import { Link } from 'react-router-dom';

const AllPlaylist = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, match: { params: { id } }, token, tokenAuth }) => {

    const { data, loading, err } = UserPlaylist(tokenAuth);
    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);
    const [arrow, setArrow] = useState(false);

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

            <section className={Style.playlists}>

            <section className={Style.section_0}>
                    <section className={Style.user} onClick={() => setArrow(!arrow)} style={{ background: arrow ? 'rgba(151,151,151, .3)' : '', width: user.display_name !== undefined ? user.display_name.length > 16 ? '210px' : '196px' : '' }}>
                        <img className={Style.userImg} src={user.images && user.images.length > 0 ? user.images[0].url : User} alt={user.display_name} />
                        <p>{user.display_name ? user.display_name.substring(0, 16) : 'Not Available'} <span style={{ display: user.display_name && user.display_name !== undefined ? user.display_name.length > 16 ? 'inline' : 'none' : 'none', color: '#fff' }}>...</span></p>
                        <img className={Style.arrow} src={arrow ? arrowUp : arrowDown} alt={user.display_name} />
                    </section>
                    <div className={Style.modal} style={{ display: arrow ? 'block' : 'none' }}>
                        <a href={`/userProfile/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                            <p>Account</p>
                        </a>
                        <hr className={Style.hr} />
                        <Link to={`/`} style={{ textDecoration: 'none' }}>
                            <p>Log out</p>
                        </Link>
                    </div>

                </section>

                <section className={Style.section_a}>

                    <h2 className={Style.h2}>Playlists</h2>
                    <div className={Style.flex}>
                        {data.length > 0 ? data.map(playlist => <Playlist token={token} playlist={playlist} key={playlist.track ? playlist.track.id : ''} />) : <p style={{color: '#fff'}}>Not Data Available</p>}
                    </div>
                </section>
            </section>

        </main>
    )
}

export default AllPlaylist
