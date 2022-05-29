import React from "react";
import LibrarySong from "../LibrarySong";

const Library = ({ songs, setCurrentSong, setSongs, libraryStatus }) => {

    return (
        <div className={`library ${libraryStatus ? 'open' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => {
                    return <LibrarySong setSongs={setSongs} songs={songs} key={song.id} setCurrentSong={setCurrentSong} song={song}/>
                })}
            </div>
        </div>
    )
}

export default Library;