import React, { useState } from 'react';
import Style from './UserProfile.module.css';
import Nav from './Nav/Nav';
import { UserProfile } from '../../hooks/hook';
import User from '../../assets/user.jpeg';
import { Link } from 'react-router-dom';
import arrowUp from '../../assets/arrowUp.svg';
import arrowDown from '../../assets/arrowDown.svg';
import Right from '../../assets/right.svg';
import Left from '../../assets/left.svg';

const UserProfileCo = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, match: { params: { id } }, token, tokenAuth }) => {

    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);
    const [arrow, setArrow] = useState(false);

    console.log(user, 'user');

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

            <section className={Style.userContainer}>

                <div className={Style.arrows}>

                    <section className={Style.leftRight}>
                        <Link to={`/home/${localStorage.getItem('token')}`}>
                            <img src={Left} alt="left img" />
                        </Link>
                        <img src={Right} alt="right img" style={{ display: 'none' }} />
                    </section>

                    <section className={Style.section_0}>
                        <section className={Style.userLayout} onClick={() => setArrow(!arrow)} style={{ background: arrow ? 'rgba(151,151,151, .3)' : '', width: user.display_name !== undefined ? user.display_name.length > 16 ? '210px' : '196px' : '' }}>
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

                <section className={Style.description}>
                    <h1>Account Description</h1>
                    <h4 className={Style.h4}>Profile</h4>
                    <img src={user && user.images && user.images.length > 0 ? user.images[0].url : User} />
                    <div className={Style.border}>
                        <p className={Style.title}>Username</p>
                        <p className={Style.info}>{user ? user.id : ''}</p>
                    </div>
                    <div className={Style.border}>
                        <p className={Style.title}>Email</p>
                        <p className={Style.info}>{user ? user.email : ''}</p>
                    </div>
                    <div className={Style.border}>
                        <p className={Style.title}>Country or Region</p>
                        <p className={Style.info}>{user ? user.country : ''}</p>
                    </div>
                    <div className={Style.plan}>
                        <h4>Your Plan</h4>
                        <div className={Style.top} style={{ background: user ? user.product === 'open' ? 'rgb(174,41,189)' : user.product === 'premium' ? 'rgb(45,70,185)' : 'rgb(52, 73, 94)' : '' }}>
                            <p>{user ? user.product === 'open' ? 'Free Spotify' : user.product === 'premium' ? 'Spotify Premium Duo' : '' : 'Not Info'}</p>
                        </div>

                        <div className={Style.bottom}>
                            <p>{user ? user.product === 'open' ? 'Play music only in shuffle mode, with ads.' : user.product === 'premium' ? 'Two separate Premium accounts for people living together.' : '' : 'Not Info'}</p>
                            <strong className={Style.type}>{user ? user.product === 'open' ? 'Free' : user.product === 'premium' ? 'You are a member of a Duo plan.' : '' : 'Not Info'}</strong>
                        </div>

                    </div>
                </section>
            </section>

        </main >
    )
}

export default UserProfileCo
