import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Heart, SkipBack, SkipForward, Shuffle, Search, Volume2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const MusicPlayer: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isShuffled, setIsShuffled] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songs = [
    {
      "title": "Meen Momken",
      "artist": "Tamer Hosny",
      "duration": "4:27",
      "src": `${import.meta.env.BASE_URL}songs/01.Meen_Momken.mp3`

    },  {
    "title": "Ewediny",
    "artist": "Hamaki",
    "duration": "5:43",
    "src": `${import.meta.env.BASE_URL}songs/01_-_Ewediny.mp3`

    
  },        {
      "title": "Omry Maak",
      "artist": "Angham",
      "duration": "5:30",
      "src": `${import.meta.env.BASE_URL}songs/01._Omry_Maak.mp3`
    },


  ];

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const selectSong = (index: number) => {
    const actualIndex = songs.findIndex(song => song === filteredSongs[index]);
    setCurrentSong(actualIndex);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = songs[actualIndex].src;
      audioRef.current.load();
    }
  };

  const nextSong = () => {
    const nextIndex = isShuffled 
      ? Math.floor(Math.random() * songs.length)
      : (currentSong + 1) % songs.length;
    setCurrentSong(nextIndex);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = songs[nextIndex].src;
      audioRef.current.load();
    }
  };

  const prevSong = () => {
    const prevIndex = isShuffled 
      ? Math.floor(Math.random() * songs.length)
      : (currentSong - 1 + songs.length) % songs.length;
    setCurrentSong(prevIndex);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.src = songs[prevIndex].src;
      audioRef.current.load();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.volume = volume;

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong, volume]);

  return (
    <section id="playlist" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          Our Playlist
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <p className="text-center text-white/80 mb-8 text-lg">Songs that tell our story</p>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                placeholder="Search songs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
              />
            </div>

            {/* Current Song Display */}
            <div className="text-center mb-8 p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-semibold text-white mb-2">{songs[currentSong]?.title || 'No Song Selected'}</h3>
              <p className="text-white/60 mb-4">{songs[currentSong]?.artist || 'Unknown Artist'}</p>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-white/60 mt-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center space-x-4 mb-4">
                <button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isShuffled ? 'bg-pink-400 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <Shuffle size={20} />
                </button>
                
                <button
                  onClick={prevSong}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 text-white"
                >
                  <SkipBack size={24} />
                </button>
                
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  {isPlaying ? (
                    <Pause size={24} className="text-white" />
                  ) : (
                    <Play size={24} className="text-white ml-1" />
                  )}
                </button>
                
                <button
                  onClick={nextSong}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 text-white"
                >
                  <SkipForward size={24} />
                </button>

                <div className="flex items-center space-x-2">
                  <Volume2 size={20} className="text-white/60" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
            
            {/* Playlist */}
            <div className="max-h-96 overflow-y-auto space-y-2 custom-scrollbar">
              {filteredSongs.map((song, index) => {
                const actualIndex = songs.findIndex(s => s === song);
                return (
                  <div
                    key={`${song.src}-${index}`}
                    onClick={() => selectSong(index)}
                    className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                      currentSong === actualIndex ? 'bg-white/10 border border-pink-400/30' : 'hover:translate-x-2'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      currentSong === actualIndex ? 'bg-pink-400' : 'bg-white/10'
                    }`}>
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{song.title}</h4>
                      <p className="text-white/60 text-sm truncate">{song.artist}</p>
                    </div>
                    <div className="text-white/40 text-sm mr-4">{song.duration}</div>
                    <Heart size={16} className="text-pink-400 flex-shrink-0" />
                  </div>
                );
              })}
            </div>
            
            {filteredSongs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-white/60">No songs found matching your search.</p>
              </div>
            )}
            
            {/* Hidden audio element */}
            <audio 
              ref={audioRef} 
              className="hidden"
              src={songs[currentSong]?.src}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 107, 0.6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 107, 0.8);
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ff6b6b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ff6b6b;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
};

export default MusicPlayer;