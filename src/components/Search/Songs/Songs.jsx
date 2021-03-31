import React, { useState, useEffect } from 'react';
import User from '../../../assets/user.jpeg';
import Style from './Song.module.css';
import { LikedSongsApi, SaveTracks, DeleteLikedSongApi } from '../../../hooks/hook';
import cx from 'classnames';

const Songs = ({ song, setId2, setId, idliked, idliked2, tokenAuth, userPlaylist, setPlaylist }) => {

    let minutes = Math.floor(song.duration_ms / 60000);
    let seconds = ((song.duration_ms % 60000) / 1000).toFixed(0);
    const [play, setPlay] = useState(true);
    const { data, loading, err } = LikedSongsApi(tokenAuth, idliked, idliked2);
    const [option, setOption] = useState(false);

    let liked = false;
    let map = [];
    let recorrer = [];
    const Refresh = () => {
        recorrer = data ? data.map(songs => map.push(songs.track.id)) : '';
        liked = map ? map.includes(song ? song.id : '') : 'na';
    };
    Refresh();


    return (
        <section className={Style.container}>
            <iframe src={`https://open.spotify.com/embed?uri=${song.uri}`} width={play ? '80' : '470'} height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            <div style={{ display: play ? 'block' : 'none' }} className={Style.inner}>
                <p className={Style.songName}>{song.name}</p>
                <div className={Style.flex}>
                    <p className={Style.e} style={{ display: song.explicit ? 'block' : 'none' }}>E</p>
                    {song.artists.map(artist => <span>{artist.name},</span>)}
                </div>

            </div>

            <div className={Style.leftContainer}>

                {liked ? <i className={cx("fas fa-heart", Style.greenHeartFull)} onClick={() => setId2(song ? song.id : '')}></i> :
                    <i className={cx("far fa-heart", Style.greenHeart)} onClick={() => setId(song ? song.id : '')}></i>
                }

                <span className={Style.time}>{`${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`}</span>

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

        </section>
    )
}

export default Songs
