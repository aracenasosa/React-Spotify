import React, { useState } from 'react';
import Style from './CreatePlaylistForm.module.css';
import Nav from '../Nav/Nav';
import { UserProfile, AddPlaylist } from '../../../hooks/hook';
import { Link } from 'react-router-dom';
import User from '../../../assets/user.jpeg';
import arrowUp from '../../../assets/arrowUp.svg';
import arrowDown from '../../../assets/arrowDown.svg';
import Spotify from '../../../assets/spotifyIcon.svg';
import { withRouter } from 'react-router-dom';

const CreatePlaylistForm = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, history, token, tokenAuth }) => {

    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);
    const [arrow, setArrow] = useState(false);

    const [data, setData] = useState({
        name: '',
        description: '',
        state: false
    })

    const { data: result, loading: userresult, err: errResult } = AddPlaylist(
        user ? user.id : '', 
        tokenAuth, 
        data.name ? data.name : '', 
        data.description ? data.description : '', 
        data.state
        );

   console.log(result, 'result');
    console.log(userresult, 'err');
    //console.log(history, 'his');

    const Submit = e => {
        e.preventDefault();
        if(e.target.name.value.trim().length < 1) 
        {
            alert('Pls, fill all the fields');
        }
        else 
        { 
            setData({ 
                name: e.target.name.value, 
                description: e.target.description.value, 
                state: e.target.state.value
            })

            e.target.name.value = '';
            e.target.description.value = '';
            e.target.state.value = false
            
        }
    };

    if(result.status === 201 && result.ok === true) { history.push(`/createPlaylist/${localStorage.getItem('token')}`) }

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
                    token={token}
                    tokenAuth={tokenAuth}
                />
            </section>
            <section className={Style.createForm}>

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

                <section>
                    <h2 className={Style.h2}>Create a Playlist</h2>
                    <form className={Style.form} onSubmit={Submit}>
                        <img className={Style.App_logo} src={Spotify} alt="Spotify Logo" />
                        <input type="text" placeholder="Playlist Name" name="name" autoComplete="off"/>
                        <textarea placeholder="Playlist Description(Optional)" name="description" autoComplete="off"></textarea>
                        <select name="state">
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </select>
                        <button type="submit">Save</button>
                    </form>
                </section>
            </section>

        </main >
    )
}

export default CreatePlaylistForm
