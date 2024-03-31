import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause } from 'react-icons/fa';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [musicUrl, setMusicUrl] = useState('');
  const [playing, setPlaying] = useState(false);

  const handleMusicUrlChange = (event) => {
    setMusicUrl(event.target.value);
  };

  const togglePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div className="music-player">
      <input
        type="text"
        value={musicUrl}
        onChange={handleMusicUrlChange}
        placeholder="Enter your Music!!"
      />
      <button onClick={togglePlay}>
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <ReactPlayer
        url={musicUrl}
        playing={playing}
        config={{
          file: {
            forceAudio: true,
          },
        }}
        controls={true}
        width="0%"
        height="0px"
      />
    </div>
  );
};

export default MusicPlayer;