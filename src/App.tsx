"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import "./app.css"

// tipos
type Song = {
  id: string
  title: string
  artist: string
  duration: string
  cover: string
}

type ContainerProps = {
  children: React.ReactNode
  title?: string
}

type SongCardProps = {
  song: Song
  onClick: (song: Song) => void
}

type NavbarProps = {
  title: string
  onSearchToggle: () => void
  showSearch: boolean
  onHomeClick: () => void
}

type SearchBarProps = {
  searchTerm: string
  onSearchChange: (term: string) => void
}

// imagen por defecto
const DEFAULT_COVER = "https://cdn-icons-png.flaticon.com/512/557/557098.png"

// datos mockeados - combinados en un solo array
const allSongs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:20",
    cover: "",
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    duration: "3:53",
    cover: "",
  },
  {
    id: "3",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: "5:55",
    cover: "",
  },
  {
    id: "4",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    duration: "8:02",
    cover: "",
  },
  {
    id: "5",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    duration: "3:20",
    cover: "",
  },
  {
    id: "6",
    title: "As It Was",
    artist: "Harry Styles",
    duration: "2:47",
    cover: "",
  },
  {
    id: "7",
    title: "Take Five",
    artist: "Dave Brubeck",
    duration: "5:24",
    cover: "",
  },
  {
    id: "8",
    title: "Fly Me to the Moon",
    artist: "Frank Sinatra",
    duration: "2:28",
    cover: "",
  },
]

// Separar canciones por categorias
const popularSongs: Song[] = allSongs.slice(0, 2)
const rockSongs: Song[] = allSongs.slice(2, 4)
const popSongs: Song[] = allSongs.slice(4, 6)
const jazzSongs: Song[] = allSongs.slice(6, 8)

// componente barra de busqueda
const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="¿Qué te apetece escuchar?"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button onClick={() => onSearchChange("")} className="search-clear">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// componente navbar
const Navbar: React.FC<NavbarProps> = ({ title, onSearchToggle, showSearch, onHomeClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="logo">
            <span className="logo-icon"></span>
            {title}
          </div>
          <div className="nav-buttons">
            <button className="nav-btn">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="nav-btn">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l3 2a1 1 0 010 1.664l-3 2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="navbar-right">
          <button className="nav-link" onClick={onHomeClick}>
            Inicio
          </button>
          <button onClick={onSearchToggle} className={`nav-link ${showSearch ? "active" : ""}`}>
            Buscar
          </button>
          <button className="nav-link">Tu biblioteca</button>
        </div>
      </div>
    </nav>
  )
}

// componente container
const Container: React.FC<ContainerProps> = ({ children, title }) => {
  return (
    <div className="section-container">
      {title && (
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <button className="show-all-btn">Mostrar todo</button>
        </div>
      )}
      <div className="song-list">{children}</div>
    </div>
  )
}

// componente individual
const SongCard: React.FC<SongCardProps> = ({ song, onClick }) => {
  return (
    <div className="song-card" onClick={() => onClick(song)} style={{ cursor: "pointer" }}>
      <div className="song-cover-container">
        <img src={song.cover?.trim() || DEFAULT_COVER} alt={`${song.title} cover`} className="song-cover" />
        <div className="play-overlay">
          <button className="play-btn">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
      </div>
      <div className="song-actions">
        <button className="action-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <span className="song-duration">{song.duration}</span>
        <button className="action-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 000 6.364L12 20.364l7.682-7.682a1 1 0 00-6.364-6.364L12 7.636l-1.318-1.318a1 1 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Funcion para convertir tiempo en segundos a formato mm:ss
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

// Funcioin para convertir duración "mm:ss" a segundos
const durationToSeconds = (duration: string): number => {
  const [mins, secs] = duration.split(":").map(Number)
  return mins * 60 + secs
}

// componente principal
const App: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0 a 100
  const [currentTime, setCurrentTime] = useState(0) // en segundos
  const [volume, setVolume] = useState(50)

  // obtener duración total de la canciosn actual en segundos
  const totalDuration = currentSong ? durationToSeconds(currentSong.duration) : 0

  // Simular progreso de la cancion
  const [interval, setIntervalId] = useState<number | null>(null)

  const handleProgressChange = (value: number) => {
    const newTime = (value / 100) * totalDuration
    setCurrentTime(newTime)
    setProgress(value)

    // actualizar la variable CSS para mostrar el progreso visualmente
    document.documentElement.style.setProperty("--progress-width", `${value}%`)
  }

  // agregar nueva funciun para manejar el volumen:
  const handleVolumeChange = (value: number) => {
    setVolume(value)
    document.documentElement.style.setProperty("--volume-width", `${value}%`)
  }

  useEffect(() => {
    let intervalId: number | null = null

    if (isPlaying && currentSong) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1
          const newProgress = (newTime / totalDuration) * 100

          if (newTime >= totalDuration) {
            setIsPlaying(false)
            setCurrentTime(0)
            setProgress(0)
            document.documentElement.style.setProperty("--progress-width", "0%")
            return 0
          }

          setProgress(newProgress)
          document.documentElement.style.setProperty("--progress-width", `${newProgress}%`)
          return newTime
        })
      }, 1000) as any
    }

    setIntervalId(intervalId)

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPlaying, currentSong, totalDuration])

  // diltrar canciones basado en el termino de busqueda
  const filteredSongs = useMemo(() => {
    if (!searchTerm.trim()) return []

    return allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const handleSearchToggle = () => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      setSearchTerm("")
    }
  }

  const handleHomeClick = () => {
    setShowSearch(false)
    setSearchTerm("")
  }

  const handleSongClick = (song: Song) => {
    setCurrentSong(song)
    setCurrentTime(0)
    setProgress(0)
    setIsPlaying(true)
  }

  useEffect(() => {
    document.documentElement.style.setProperty("--progress-width", "0%")
    document.documentElement.style.setProperty("--volume-width", "50%")
  }, [])

  return (
    <div className="app-container">
      <Navbar
        title="Spotify"
        onSearchToggle={handleSearchToggle}
        showSearch={showSearch}
        onHomeClick={handleHomeClick}
      />

      <div>
        {showSearch && (
          <>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {searchTerm && (
              <Container title={`Resultados de "${searchTerm}"`}>
                {filteredSongs.length > 0 ? (
                  filteredSongs.map((song) => <SongCard key={song.id} song={song} onClick={handleSongClick} />)
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="no-results-title">No se han encontrado resultados para "{searchTerm}"</h3>
                    <p className="no-results-subtitle">
                      Asegúrate de que las palabras estén escritas correctamente o usa menos palabras clave o palabras
                      clave diferentes.
                    </p>
                  </div>
                )}
              </Container>
            )}
          </>
        )}

        {!showSearch && (
          <>
            <Container title="Escuchado recientemente">
              {popularSongs.map((song) => (
                <SongCard key={song.id} song={song} onClick={handleSongClick} />
              ))}
            </Container>

            <Container title="Rock clásico">
              {rockSongs.map((song) => (
                <SongCard key={song.id} song={song} onClick={handleSongClick} />
              ))}
            </Container>

            <Container title="Pop actual">
              {popSongs.map((song) => (
                <SongCard key={song.id} song={song} onClick={handleSongClick} />
              ))}
            </Container>

            <Container title="Jazz y blues">
              {jazzSongs.map((song) => (
                <SongCard key={song.id} song={song} onClick={handleSongClick} />
              ))}
            </Container>
          </>
        )}
      </div>

      {/* Reproductor fijo en la parte inferior */}
      <footer className="player">
        <div className="player-left">
          <div className="player-cover">
            <img
              src={currentSong?.cover?.trim() || DEFAULT_COVER}
              alt={currentSong ? `${currentSong.title} cover` : "No cover"}
              className="player-cover-img"
            />
          </div>
          <div className="player-info">
            {currentSong ? (
              <>
                <h4 className="player-song-title">{currentSong.title}</h4>
                <p className="player-song-artist">{currentSong.artist}</p>
              </>
            ) : (
              <>
                <h4 className="player-song-title">Sin reproducir</h4>
                <p className="player-song-artist">Elige algo para reproducir</p>
              </>
            )}
          </div>
          <button className="player-heart-btn">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        <div className="player-center">
          <div className="player-controls">
            <button className="player-btn">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            <button className="player-btn play-btn-main" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button className="player-btn">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          <div className="progress-container">
            <span className="current-time">{formatTime(currentTime)}</span>
            <div className="progress-bar-container">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => handleProgressChange(Number(e.target.value))}
                className="progress-slider"
              />
            </div>
            <span className="duration">{currentSong?.duration || "0:00"}</span>
          </div>
        </div>

        <div className="player-right">
          <button className="player-btn">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </button>
          <button className="player-btn">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </button>
          <div className="volume-control">
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="volume-slider"
            />
          </div>
          <button className="player-btn">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App
