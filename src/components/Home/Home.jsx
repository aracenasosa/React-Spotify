import React, { useState } from 'react';
import { Nav } from '../components';
import Style from './Home.module.css';
import NewRelease from './NewReleases/NewRelease';
import RecentlyPlayed from './RecentlyPlayed/RecentlyPlayed';
import { NewReleases, FeaturedPlaylist, UserProfile, UserRecentlyPlayed } from '../../hooks/hook';
import FeaturedPlaylistcp from '../Search/FeaturedPlaylist/FeaturedPlaylistcp';
import { Link } from 'react-router-dom';
import User from '../../assets/user.jpeg';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import cx from 'classnames';

const Home = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, match: { params: { id } }, match, token, tokenAuth }) => {

    const { data: releases, loading, err } = NewReleases(token);
    const { data: featuredPlaylist, loading: loadingPlaylist, err: errPlaylist } = FeaturedPlaylist(token);
    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);
    const { data: recentlyPlayed, loading: loadingRecentlyPlayed, err: errrecentlyPlayed } = UserRecentlyPlayed(tokenAuth);

    const [arrow, setArrow] = useState(false);

    if(localStorage.getItem('previousLocation') !== match.url) 
    {
        localStorage.setItem('currentLocation', match.url)
    } 
    
    //localStorage.setItem('previousLocation', match.url) 
    console.log(localStorage.getItem('compare'), 'compare');

    console.log(localStorage.getItem('currentLocation'), 'currentLocation');
    console.log(localStorage.getItem('previousLocation'), 'previousLocation');
    console.log(localStorage.getItem('compare'), 'compare');

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
            <section className={Style.home}>

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

                {loadingPlaylist && loadingRecentlyPlayed && userLoading && loading ?
                    <section>

                        <section className={Style.section_recently} style={{ display: releases.length > 0 ? 'block' : 'none' }}>

                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>Recently Played</h2>
                                <a href={`/allRecentlyPlayed/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: recentlyPlayed && recentlyPlayed.length > 8 ? 'block' : 'none' }}>See All</p>
                                </a>
                            </div>

                            <div className={Style.recentlyContainer}>
                                {recentlyPlayed.length > 0 ? recentlyPlayed.map((recently, idx) => <RecentlyPlayed token={token} recentlyPlayed={recently} key={idx} />).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </div>
                        </section>

                        <section className={Style.section_a} style={{ display: releases.length > 0 ? 'block' : 'none' }}>
                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>New Releases</h2>
                                <a href={`/allNewRelease/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: releases && releases.length > 8 ? 'block' : 'none' }}>See All</p>
                                </a>
                            </div>
                            <div className={Style.releasesContainer}>
                                {releases.length > 0 ? releases.map(release => <NewRelease release={release} key={release ? release.name : ''} />).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </div>
                        </section>

                        <section className={Style.section_b} style={{ display: featuredPlaylist.length > 0 ? 'block' : 'none' }}>
                            <div className={Style.titleContainer}>
                                <h2 className={Style.h2}>Featured Playlist</h2>
                                <a href={`/allFeaturedPlaylist/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                    <p className={Style.seeAll} style={{ display: featuredPlaylist && featuredPlaylist.length > 8 ? 'block' : 'none' }}>See All</p>
                                </a>
                            </div>
                            <div className={Style.featuredContainer}>
                                {featuredPlaylist ? featuredPlaylist.map(play => <FeaturedPlaylistcp playlist={play} key={play ? play.name : ''} />).slice(0, 8) : <p style={{color: '#fff'}}>Not Data Available</p>}
                            </div>
                        </section>
                    </section>
                    : <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i>}
            </section>

        </main>
    )
}

export default Home
