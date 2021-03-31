import React, { useEffect, useState } from 'react';
import Style from './Song.module.css';
import greenHeart from '../../../assets/greenHeart.svg';
import cx from 'classnames';
import {LikedSongsApi, DeleteLikedSongApi, SaveTracks} from '../../../hooks/hook';

const Song = ({ track, idx, setId, setId2, userPlaylist, setPlaylist, tokenAuth, idliked, idliked2}) => {

    const [play, setPlay] = useState(true);
    const [option, setOption] = useState(false);
    const { data, loading, err } = LikedSongsApi(tokenAuth, idliked, idliked2);
    const { data: saveTracks, loading: saveTracksLoading, err: errsaveTracks } = SaveTracks(idliked, tokenAuth);
    let liked = false;
    let map = [];
    let recorrer = [];
    const Refresh = () => 
    {
        recorrer = data ? data.map(songs => map.push(songs.track.id)) : '';
        liked = map ? map.includes(track.id) : 'na'; 
    };
    Refresh();

    return (
        <section className={Style.card}>
            <div className={Style.doblao}>
                <span className={Style.number}>{idx + 1}</span>
                <iframe src={`https://open.spotify.com/embed?uri=${track.uri}`} width={play ? '80' : '470'} height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <div className={Style.space}>
                    <p className={Style.songName} style={{ display: play ? 'block' : 'none' }} > {track.name} </p>
                    <p className={Style.e} style={{ display: track && play ? track.explicit ? 'block' : 'none' : 'none' }}>E</p>
                </div>
            </div>
            <p className={Style.albumName}>{track.album.name}</p>
            <div className={Style.doblao2}>
                
                { liked ? <i className={cx("fas fa-heart", Style.greenHeartFull)} onClick={() => setId2(track.id)}></i> : 
                 <i className={cx("far fa-heart", Style.greenHeart)} onClick={() => setId(track.id)}></i>
                }
                
                <p className={Style.duration}>{track ? `${Math.floor(track.duration_ms / 60000)}:${(((track.duration_ms % 60000) / 1000).toFixed(0) < 10 ? '0' : '')}${((track.duration_ms % 60000) / 1000).toFixed(0)}` : ''}</p>
                
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
                                setPlaylist({ id: playlist ? playlist.id : '', uri: track ? track.uri : '' });
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

export default Song
