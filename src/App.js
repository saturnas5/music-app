import React, {useState} from "react";
import data from './data';
import Player from "./components/Player";
import Song from "./components/Song";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[Math.floor(Math.random() * (songs.length))]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} currentSong={currentSong}/>
    </div>
  );
}

export default App;
