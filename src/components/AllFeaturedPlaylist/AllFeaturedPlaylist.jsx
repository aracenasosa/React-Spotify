import React, { useState } from 'react';
import { UserProfile, FeaturedPlaylist } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import Nav from './Nav/Nav';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import { Link } from 'react-router-dom';
import FeaturedPlaylistcp from '../Search/FeaturedPlaylist/FeaturedPlaylistcp';
import cx from 'classnames';
import Style from './AllFeaturedPlaylist.module.css';

const AllFeaturedPlaylist = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, match: { params: { id } }, token, tokenAuth }) => {

    const { data: featuredPlaylist, loading: loadingFeaturedPlaylist, err: errFeaturedPlaylist } = FeaturedPlaylist(tokenAuth);
    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);
    const [arrow, setArrow] = useState(false);
    console.log(featuredPlaylist);


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
            <section className={Style.recently}>

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
                {loadingFeaturedPlaylist ?
                    <section className={Style.section_recently}>
                        <h2 className={Style.h2}>Featured Playlist</h2>
                        <div className={Style.recentlyContainer}>
                            {featuredPlaylist.length > 0 ? featuredPlaylist.map((play, idx) => <FeaturedPlaylistcp playlist={play} key={play ? play.name : ''} />) : <p style={{color: '#fff'}}>Not Data Available</p>}
                        </div>
                    </section>
                    : <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i>}

            </section>

        </main>
    )
}

export default AllFeaturedPlaylist
