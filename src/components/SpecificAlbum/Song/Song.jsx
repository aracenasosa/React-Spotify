import React, { useState } from 'react';
import CountUp from 'react-countup';
import Style from './Song.module.css';
import cx from 'classnames';
import { SaveTracks, LikedSongsApi, DeleteLikedSongApi } from '../../../hooks/hook';

const Song = ({ song, idx, tokenAuth, userPlaylist, setPlaylist, setId2, setId, idliked, idliked2 }) => {

    const [play, setPlay] = useState(true);
    const [option, setOption] = useState(false);
    const { data, loading, err } = LikedSongsApi(tokenAuth, idliked, idliked2);
    const { data: saveTracks, loading: saveTracksLoading, err: errsaveTracks } = SaveTracks(idliked, idliked2, tokenAuth);
    const { data: deleteLiked, loading: deleteLikedLoading, err: errLikedLoading } = DeleteLikedSongApi(idliked, idliked2, tokenAuth);
    let liked = false;
    let map = [];
    let recorrer = [];
    const Refresh = () => {
        recorrer = data ? data.map(songs => map.push(songs.track.id)) : '';
        liked = map ? map.includes(song ? song.id : '') : 'na';
    };
    Refresh();

    return (

        <tr className={Style.container}>
            <td className={Style.number} onClick={() => setPlay(!play)}>{idx + 1}</td>
            <td className={Style.flex} onClick={() => setPlay(!play)}>
                <iframe src={`https://open.spotify.com/embed?uri=${song.uri}`} width={play ? '80' : '470'} height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <div className={Style.containerLeft}>
                    <p style={{ display: song && play ? 'flex' : 'none' }} className={Style.songName}>{song ? song.name : ''}</p>
                    <div className={Style.inner}>
                        <p className={Style.e} style={{ display: song && play ? song.explicit ? 'flex' : 'none' : 'none' }}>E</p>
                        <a href={`/artist/${song && song.artists && song.artists[0] ? song.artists[0].id : ''}/${localStorage.getItem('token')}`}>
                           <p style={{ display: song && play ? 'flex' : 'none' }} className={Style.artistName}>{song.artists[0].name}</p>
                        </a>
                    </div>
                </div>
            </td>

            <td className={Style.duration}>
                <div>

                    {liked ? <i className={cx("fas fa-heart", Style.greenHeartFull)} onClick={() => setId2(song.id)}></i> :
                        <i className={cx("far fa-heart", Style.greenHeart)} onClick={() => setId(song.id)}></i>
                    }

                    {song ? `${Math.floor(song.duration_ms / 60000)}:${(((song.duration_ms % 60000) / 1000).toFixed(0) < 10 ? '0' : '')}${((song.duration_ms % 60000) / 1000).toFixed(0)}` : ''}

                    <div className={Style.circleContainer} onClick={() => setOption(!option)}>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                        <div className={Style.circle}></div>
                    </div>

                    <div className={Style.options} style={{ display: option ? 'block' : 'none' }}>
                    <i className={cx("fas fa-times", Style.x)} onClick={() => setOption(!option)}></i>
                        <p>{userPlaylist && userPlaylist.length > 0 ? userPlaylist.map(playlist => (
                            <p className={Style.playlistName}
                                onClick={() => {
                                    setPlaylist({ id: playlist ? playlist.id : '', uri: song ? song.uri : '' });
                                    setOption(!option);
                                }}>
                                {playlist ? playlist.name : ''}
                            </p>
                        )) : ''}
                        </p>
                    </div>
                </div>
            </td>

        </tr>

    )
}

export default Song
