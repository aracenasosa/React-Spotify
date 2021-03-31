import Style from './EditPlaylist.module.css';
import React, { useState } from 'react';
import Nav from '../Nav/Nav';
import { SpecifiedPlaylist, UpdatePlaylist, UserProfile } from '../../../hooks/hook';
import { Link } from 'react-router-dom';
import User from '../../../assets/user.jpeg';
import arrowUp from '../../../assets/arrowUp.svg';
import arrowDown from '../../../assets/arrowDown.svg';
import { withRouter } from 'react-router-dom';
import Spotify from '../../../assets/spotifyIcon.svg';

const EditPlaylist = ({ stateLink, setStateLink, stateLink2, setStateLink2, stateLink3, setStateLink3, history, match: { params: { id } }, token, tokenAuth }) => {

    const { data: dataPlaylist, loading: playlistLoading, err: playlistErr } = SpecifiedPlaylist(id, tokenAuth);
    const { data: user, loading: userLoading, err: errLoading } = UserProfile(tokenAuth);

    const [arrow, setArrow] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        state: false
    });

    const Submit = e => {
        e.preventDefault();
        if (e.target.name.value.trim().length < 1) {
            alert('Pls, enter the name');
        }
        else {
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

    /* window.setTimeout(() => {
     setData({
         name: dataPlaylist.name ? dataPlaylist.name : '',
         description: dataPlaylist ? dataPlaylist.description : '',
         state: dataPlaylist ? dataPlaylist.public : false
     });
    }) */

    const { data: result, loading: userresult, err: errResult } = UpdatePlaylist(
        id,
        tokenAuth,
        data.name,
        data.description,
        data.state
    );

    console.log(dataPlaylist, 'playlist');
    console.log(id, 'params');
    console.log(result, 'update');
    console.log(errResult, 'err');
    console.log(data, 'state');

    if (result.status === 200 && result.ok === true) { history.push(`/createPlaylist/${localStorage.getItem('token')}`) }

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
                    <h2 className={Style.h2}>Edit a Playlist</h2>
                    <form className={Style.form} onSubmit={Submit}>
                        <img className={Style.App_logo} src={Spotify} alt="Spotify Logo" />

                        <input type="text" placeholder="Playlist Name" name="name" autoComplete="off" />

                        <textarea
                            placeholder="Playlist Description(Optional)"
                            name="description"
                            autoComplete="off">
                        </textarea>

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

export default EditPlaylist
