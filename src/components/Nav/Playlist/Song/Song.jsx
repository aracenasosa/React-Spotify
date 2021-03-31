import React, { useState } from 'react';
import Style from './Song.module.css';
import CountUp from 'react-countup';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { SaveTracks, LikedSongsApi, DeleteLikedSongApi } from '../../../../hooks/hook';

const Song = ({ song, idx, collaborative, tokenAuth, userPlaylist, setPlaylist, setId2, setId, idliked, idliked2, setUriRemove }) => {

    const [play, setPlay] = useState(true);
    const [option, setOption] = useState(false);
    const { data, loading, err } = LikedSongsApi(tokenAuth, idliked, idliked2);
    let liked = false;
    let map = [];
    let recorrer = [];
    const Refresh = () => {
        recorrer = data ? data.map(songs => map.push(songs.track.id)) : '';
        liked = map ? map.includes(song.track ? song.track.id : '') : 'na';
    };
    Refresh();

    return (
        <tr className={Style.container}>
            <td className={Style.number} onClick={() => setPlay(!play)} >{idx + 1}</td>
            <td className={Style.flex} onClick={() => setPlay(!play)} >
                <iframe src={`https://open.spotify.com/embed?uri=${song.track ? song.track.uri : ''}`} width='80' height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <div className={Style.containerLeft}>
                    <p className={Style.songName}>{song.track ? song.track.name : ''}</p>
                    <div className={Style.inner}>
                        <p className={Style.e} style={{ display: song.track && play ? song.track.explicit ? 'flex' : 'none' : 'none' }}>E</p>
                        {song.track ? song.track.artists.map(artist =>
                            <a href={`/artist/${artist ? artist.id : ''}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }} className={Style.artistName}>
                                <span style={{ display: song.track ? 'inline-block' : 'none' }} className={Style.artistName}>{artist.name}, </span>
                            </a>)
                            : ''}
                    </div>
                </div>
            </td>

            <td className={Style.album}>
                <a href={`/album/${song.track ? song.track.album.id : ''}/${localStorage.getItem('token')}`} style={{ textDecoration: 'none' }}>
                    <p className={Style.album}>
                        {song.track ? song.track.album.name : ''}
                    </p>
                </a>
            </td>

            <td className={Style.collaborative} style={{ display: song ? collaborative ? '' : 'none' : 'none' }}>{song ? song.added_by.id : ''}</td>
            <td className={Style.date}>{song.track ? new Date(song.added_at).toDateString() : ''}</td> {/*<Moment diff={song.added_at} unit="days">{new Date().toLocaleDateString()}</Moment> days ago*/}
            <td className={Style.duration}>
                <div>
                    {liked ? <i className={cx("fas fa-heart", Style.greenHeartFull)} onClick={() => setId2(song.track ? song.track.id : '')}></i> :
                        <i className={cx("far fa-heart", Style.greenHeart)} onClick={() => setId(song.track ? song.track.id : '')}></i>
                    }
                    {song ? `${Math.floor(song.track ? song.track.duration_ms / 60000 : '')}:${(((song.track ? song.track.duration_ms % 60000 : '') / 1000).toFixed(0) < 10 ? '0' : '')}${((song.track ? song.track.duration_ms % 60000 : '') / 1000).toFixed(0)}` : ''}

                    <div className={Style.circleContainer} onClick={() => setOption(!option)}>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                    </div>

                    <div className={Style.options} style={{ display: option ? 'block' : 'none' }}>
                        <i className={cx("fas fa-times", Style.x)} onClick={() => setOption(!option)}></i>
                        <p className={Style.remove} onClick={() => { setUriRemove(song.track ? song.track.uri : ''); setOption(!option); }}>Remove from this playlist</p>
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
