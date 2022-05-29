import React, {useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({ setSongs, setCurrentSong, songs, currentSong, isPlaying, setIsPlaying }) => {
    const audioRef = useRef(null);

    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }

    return (
        <div className='player'>
            <div className="time-control">
                <p>Start time</p>
                <div className="track">
                    <input
                        min='0'
                        max='100'
                        value='20'
                        type="range"
                    />
                </div>
                <p>End time</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon className='skip-forward' size='2x' icon={faAngleRight}/>
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

export default Player