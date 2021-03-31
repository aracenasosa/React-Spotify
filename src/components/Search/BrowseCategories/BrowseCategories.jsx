import React, { useState } from 'react';
import Style from './BrowseCategories.module.css';
import Nav from './Nav/Nav';
import { CategoryPlaylist, UserProfile } from '../../../hooks/hook';
import User from '../../../assets/user.jpeg';
import cx from 'classnames';
import arrowUp from '../../../assets/arrowUp.svg';
import arrowDown from '../../../assets/arrowDown.svg';
import Right from '../../../assets/right.svg';
import Left from '../../../assets/left.svg';
import { Link } from 'react-router-dom';

const BrowseCategories = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, token, match: { params: { id } }, tokenAuth }) => {

    const { data, loading, err } = CategoryPlaylist(id, token);
    const [arrow, setArrow] = useState(false);
    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);
    console.log(id, 'id');
    console.log(data, 'CategoryPlaylist');

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

            <section className={Style.category}>

                {loading ?
                    <section>

                        <div className={Style.arrows}>

                            <section className={Style.leftRight}>
                                <Link to={`/home/${localStorage.getItem('token')}`}>
                                    <img src={Left} alt="left img" />
                                </Link>
                                <img src={Right} alt="right img" style={{ display: 'none' }} />
                            </section>

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
                        </div>

                        <section className={Style.section_a}>
                            <h2 className={Style.h2}>Playlist for <span style={{ textTransform: 'uppercase' }}>{id}</span></h2>
                            <div className={Style.flex}>
                                {data ? data.map(playlist => (
                                    <section className={Style.marginContainer}>
                                        <a href={`/playlist/${playlist.id}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                            <section className={Style.card}>
                                                <img className={Style.artistImg} src={playlist ? playlist.images[0].url : User} alt={playlist ? playlist.name : ''} />

                                                <h4>{playlist ? playlist.name.substring(0, 18) : ''} <span style={{ display: playlist ? playlist.name.length > 18 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></h4>

                                                <p>{playlist ? playlist.description.substring(0, 30) : ''} <span style={{ display: playlist ? playlist.description.length > 30 ? 'inline' : 'none' : '', color: '#fff' }}>...</span></p>

                                            </section>
                                        </a>
                                    </section >
                                )) : ''}
                            </div>
                        </section>
                    </section>
                    :
                    <i className={cx('fas fa-sync fa-spin fa-8x', Style.loading)}></i>
                }
            </section>
        </main>
    )
}

export default BrowseCategories
