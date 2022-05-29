import React, {useState} from "react";
import data from './data';
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import './styles/app.scss';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[Math.floor(Math.random() * (songs.length))]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} currentSong={currentSong}/>
      <Library libraryStatus={libraryStatus} songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs}/>
    </div>
  );
}

export default App;
