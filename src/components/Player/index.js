import React, {useRef, useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying, songs, setCurrentSong, setSongs }) => {
    const audioRef = useRef(null)
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0
    });

    useEffect(() => {
        const updatedSongs = songs.map(item => {
            if(item.id === currentSong.id) {
                return {...item, active: true}
            } else {
                return {...item, active: false}
            }
        })
        setSongs(updatedSongs)
    }, [currentSong])

    useEffect(() => {
        if(isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentSong])

    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime
        const duration = e.target.duration
        const roundCurrent = Math.round(current)
        const roundDuration = Math.round(duration)
        const animationPercentage = Math.round((roundCurrent / roundDuration) * 100)

        setSongInfo({...songInfo, currentTime: current, duration: duration, animationPercentage: animationPercentage})
    }

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)
        if(direction === 'forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        } else if(direction === 'back' && currentIndex > 0) {
            setCurrentSong(songs[currentIndex - 1]);
        } else if(direction === 'back' && currentIndex === 0) {
            setCurrentSong(songs[songs.length - 1])
        }
    }

    const songEndHandler = () => {
        let currentIndex = songs.findIndex(song => song.id === currentSong.id)
        setTimeout(() => {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }, 2000)
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input
                        min='0'
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                        type="range"
                    />
                    <div className="animate-track" style={trackAnim}></div>
                </div>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('back')} className='skip-back' size='2x' icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler('forward')} className='skip-forward' size='2x' icon={faAngleRight}/>
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            ></audio>
        </div>
    )
}

export default Player;