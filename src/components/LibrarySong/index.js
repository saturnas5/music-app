import React from "react";

const LibrarySong = ({ song, setCurrentSong, songs, setSongs }) => {

    const songSelectHandler = () => {
        setCurrentSong({...song, active: true})
        const updatedSongs = songs.map(item => {
            if(item.id === song.id) {
                return {...item, active: true}
            } else {
                return {...item, active: false}
            }
        })
        setSongs(updatedSongs)
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img src={song.cover} alt={song.name}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;