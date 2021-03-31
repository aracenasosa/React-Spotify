import React, { useState } from 'react';
import Style from './Song.module.css';
import CountUp from 'react-countup';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { LikedSongsApi } from '../../../hooks/hook';
import greenHeart from '../../../assets/greenHeart.svg';
import cx from 'classnames';

const Song = ({ song, idx, setId, idliked, tokenAuth, userPlaylist, setPlaylist
}) => {

    const [play, setPlay] = useState(true);
    const [option, setOption] = useState(false);
    const { data, loading, err } = LikedSongsApi(tokenAuth, idliked, idliked);

    return (
        <tr className={Style.container}>
            <td className={Style.number}>{idx + 1}</td>
            <td className={Style.flex} onClick={() => setPlay(!play)}>
                <iframe src={`https://open.spotify.com/embed?uri=${song.track ? song.track.uri : ''}`} width='80' height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <div className={Style.containerLeft}>
                    <p className={Style.songName}>{song.track ? song.track.name : ''}</p>
                    <div className={Style.inner}>
                        <p className={Style.e} style={{ display: song.track ? song.track.explicit ? 'flex' : 'none' : 'none' }}>E</p>
                        <div className={Style.flexWrap} >
                            {song.track ? song.track.artists.map(artist =>
                            (
                                <a href={`/artist/${artist ? artist.id : ''}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                                    <span style={{ display: artist ? 'block' : 'none', marginRight: '3px' }} className={Style.artistName}>{artist.name},  </span>
                                </a>)
                            )
                                : ''}
                        </div>
                    </div>
                </div>
            </td>

            <td className={Style.albumTd}>
                <a href={`/album/${song.track ? song.track.album.id : ''}`} style={{ textDecoration: 'none' }}>
                    <span className={cx(Style.album, Style.hover)}>
                        {song.track ? song.track.album.name : ''}
                    </span>
                </a>
            </td>
            <td className={Style.date}>
                <span className={Style.hover}> {song.track ? new Date(song.added_at).toDateString() : ''}</span>
            </td>
            <td className={Style.duration}>
                <div>
                    <img src={greenHeart} alt="green heart" className={Style.greenHeart} onClick={() => { setId(song.track.id); setPlay(true) }} />
                    <span className={Style.hover}>
                        {song ? `${Math.floor(song.track ? song.track.duration_ms / 60000 : '')}:${(((song.track ? song.track.duration_ms % 60000 : '') / 1000).toFixed(0) < 10 ? '0' : '')}${((song.track ? song.track.duration_ms % 60000 : '') / 1000).toFixed(0)}` : ''}
                    </span>

                    <div className={Style.circleContainer} onClick={() => setOption(!option)}>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                    </div>

                    <div className={Style.options} style={{ display: option ? 'block' : 'none' }}>
                        <i className={cx("fas fa-times", Style.x)} onClick={() => setOption(!option)}></i>
                        {userPlaylist && userPlaylist.length > 0 ? userPlaylist.map(playlist => (
                            <p className={Style.playlistName}
                                onClick={() => {
                                    setPlaylist({ id: playlist ? playlist.id : '', uri: song.track ? song.track.uri : '' });
                                    setOption(!option);
                                }}>
                                {playlist ? playlist.name : ''}
                            </p>
                        )) : ''}
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default Song
