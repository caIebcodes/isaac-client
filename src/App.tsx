import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Stream from './pages/stream'
import ContextsWrapper from './components/ContextsWrapper/ContextsWrapper'
import Album from './pages/stream/Album'
import Playlist from './pages/stream/Playlist/Playlist'
import Auth from './pages/auth'
import Home from './pages/stream/Home'
import Library from './pages/stream/Library'

function App() {
	return (
		<BrowserRouter>
			<ContextsWrapper>
				<Routes>
					<Route path="/auth" element={<Auth />} />
					<Route path="/" element={<Stream />}>
						<Route index element={<Home />} />
						<Route path="collection" element={<Library />} />
						<Route path="playlist/:uri" element={<Playlist />} />
						<Route path="album/:uri" element={<Album />} />
					</Route>
				</Routes>
			</ContextsWrapper>
		</BrowserRouter>
	)
}

export default App
