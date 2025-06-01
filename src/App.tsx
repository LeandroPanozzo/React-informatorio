import type React from "react"
import './App.css'
// Tipos TypeScript
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
}

type NavbarProps = {
  title: string
}

// Datos mockeados - 4 listas con más de 7 ítems en total
const popularSongs: Song[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    duration: "3:20",
    cover: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "2",
    title: "Shape of You",
    artist: "Ed Sheeran",
    duration: "3:53",
    cover: "/placeholder.svg?height=60&width=60",
  },
]

const rockSongs: Song[] = [
  {
    id: "3",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: "5:55",
    cover: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "4",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    duration: "8:02",
    cover: "/placeholder.svg?height=60&width=60",
  },
]

const popSongs: Song[] = [
  {
    id: "5",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    duration: "3:20",
    cover: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "6",
    title: "As It Was",
    artist: "Harry Styles",
    duration: "2:47",
    cover: "/placeholder.svg?height=60&width=60",
  },
]

const jazzSongs: Song[] = [
  {
    id: "7",
    title: "Take Five",
    artist: "Dave Brubeck",
    duration: "5:24",
    cover: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "8",
    title: "Fly Me to the Moon",
    artist: "Frank Sinatra",
    duration: "2:28",
    cover: "/placeholder.svg?height=60&width=60",
  },
]

// Componente Navbar reutilizable
const Navbar: React.FC<NavbarProps> = ({ title }) => {
  return (
    <nav className="bg-black text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-400">{title}</h1>
        <div className="flex space-x-4">
          <button className="hover:text-green-400 transition-colors">Home</button>
          <button className="hover:text-green-400 transition-colors">Search</button>
          <button className="hover:text-green-400 transition-colors">Library</button>
        </div>
      </div>
    </nav>
  )
}

// Componente Container genérico reutilizable con children
const Container: React.FC<ContainerProps> = ({ children, title }) => {
  return (
    <div className="p-6 bg-gray-900 rounded-lg mb-6">
      {title && <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>}
      <div className="space-y-3">{children}</div>
    </div>
  )
}

// Componente individual para cada canción
const SongCard: React.FC<SongCardProps> = ({ song }) => {
  return (
    <div className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
      <img src={song.cover || "/placeholder.svg"} alt={`${song.title} cover`} className="w-12 h-12 rounded-md mr-4" />
      <div className="flex-1">
        <h3 className="text-white font-medium">{song.title}</h3>
        <p className="text-gray-400 text-sm">{song.artist}</p>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-gray-400 text-sm">{song.duration}</span>
        <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Componente principal App
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar title="MusicApp" />

      <div className="p-6">
        {/* Lista 1: Canciones Populares */}
        <Container title="🔥 Canciones Populares">
          {popularSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </Container>

        {/* Lista 2: Rock Clásico */}
        <Container title="🎸 Rock Clásico">
          {rockSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </Container>

        {/* Lista 3: Pop Hits */}
        <Container title="✨ Pop Hits">
          {popSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </Container>

        {/* Lista 4: Jazz Essentials */}
        <Container title="🎷 Jazz Essentials">
          {jazzSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </Container>
      </div>
    </div>
  )
}

export default App
