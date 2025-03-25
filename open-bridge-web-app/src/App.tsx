import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProjectorScreen from './screens/ProjectorScreen'
import { useEffect, useState } from 'react';
import SongSidebar from './containers/SongSidebar';
import SetlistSidebar from './containers/SetlistSidebar';
import { CurrentSetlistProvider } from './context/CurrentSetlistContext';
import { CurrentSongProvider } from './context/CurrentSongContext';
import ProjectionSidebar from './containers/ProjectionSidebar';
import { ProjectionProvider } from './context/ProjectionContext';
import { BLANK_SETLIST, Setlist } from '../../common/types';
import { ImportSongsMessage, MessageType, onMessage as onExtensionMessage, sendMessage as sendExtensionMessage} from '../../common/comm'
import { ProjectionScreenProvider } from './context/ProjectionScreenContext';
import ThemeSidebar from './containers/ThemeSidebar';

function App() {

  const [activeSetlist, setActiveSetlist] = useState<Setlist>(BLANK_SETLIST);
  const [companionActive, setCompanionActive] = useState(false);

  useEffect(() => {

    // Load active setlist from local storage on startup
    const storedSetlist = localStorage.getItem("activeSetlist");
    if (storedSetlist) {
      setActiveSetlist(JSON.parse(storedSetlist));
    }

    onExtensionMessage(MessageType.IMPORT_SONGS, (message) => {
      message = message as ImportSongsMessage;
      console.log("Received songs to add", message.data);
      const newSongs = message.data;
      let changed = false;
      newSongs.forEach((song) => {
        if (activeSetlist.songs.some((s) => s.url === song.url)) {
          // Just skip
        } else {
          activeSetlist.songs.push(song);
          changed = true;
        }
      });
      if (changed) {
        handleUpdateActiveSetlist(activeSetlist);
      }
      sendExtensionMessage({ type: MessageType.SONGS_IMPORTED, data: newSongs });
    });

    onExtensionMessage(MessageType.COMPANION_HEARTBEAT, () => {
      if (!companionActive) setCompanionActive(true);
    });

    setInterval(() => {
      sendExtensionMessage({ type: MessageType.WEBAPP_HEARTBEAT });
    }, 1000);


  }, []);

  const handleUpdateActiveSetlist = (setlist: any) => {
    setActiveSetlist(setlist);
    localStorage.setItem("activeSetlist", JSON.stringify(setlist));
  };

  return (
    <>

          <Router>
            <Routes>
              <Route path='/' element={
                  <CurrentSetlistProvider>
                    <CurrentSongProvider>
                      <ProjectionProvider>
                        <HomeScreen activeSetlist={activeSetlist} onUpdateActiveSetlist={handleUpdateActiveSetlist}/>
                      </ProjectionProvider>
                    </CurrentSongProvider>
                  </CurrentSetlistProvider>
                  }>
                <Route path='/song' element={<SongSidebar/>} />
                <Route path='/set' element={<SetlistSidebar/>} />
                <Route path='/setlists' element={<></>} />
                <Route path='/projection-settings' element={<ProjectionSidebar/>} />
                <Route path='/themes' element={<ThemeSidebar></ThemeSidebar>} />
                <Route path='/help' element={<></>} />
                <Route path='/about' element={<></>} />
              </Route>
              <Route path='/projector' element={<ProjectionScreenProvider><ProjectorScreen/></ProjectionScreenProvider>} />
            </Routes>
          </Router>
    </>
  )
}

export default App
