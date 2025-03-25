import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Song } from '../app/types';
import { useCurrentSetlistContext } from './CurrentSetlistContext';

export interface CurrentSongContextProps {
  currentSong: Song | null;
  updateCurrentSong: (song: Song) => void;
  forceRedraw?: number;
}

const CurrentSongContext = createContext<CurrentSongContextProps>({currentSong: null, updateCurrentSong: () => null, forceRedraw: 0});

export const CurrentSongProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [forceRedraw, setForceRedraw] = useState<number>(0);

  const {currentSetlist, updateCurrentSetlist} = useCurrentSetlistContext();

  const updateCurrentSong = (song: Song) => {
    setCurrentSong(song);

    // Find current song in active setlist and update it
    if (currentSetlist && currentSetlist.songs.length > 0) {
      const index = currentSetlist.songs.findIndex((s) => (s.title === song.title && s.url === song.url));
      if (index >= 0) {
        currentSetlist.songs[index] = song;
        updateCurrentSetlist(currentSetlist);
      }
    }

    setForceRedraw(forceRedraw + 1);
  }

  return (
    <CurrentSongContext.Provider value={{ currentSong, updateCurrentSong, forceRedraw }}>
      {children}
    </CurrentSongContext.Provider>
  );
};

export const useCurrentSongContext = () => useContext(CurrentSongContext);

export function withCurrentSongContext<T extends CurrentSongContextProps = CurrentSongContextProps> (Component: React.ComponentType<T>) {
    const displayName = Component.displayName || Component.name || "Component";
    const ComponentWithContext = (props: Omit<T, keyof CurrentSongContextProps>) => {
        return (
            <CurrentSongContext.Consumer>
                { contextProps => <Component {...contextProps} {...(props as T) }></Component> }
            </CurrentSongContext.Consumer>
        );
    };
    ComponentWithContext.displayName = `withCurrentSongContext(${displayName})`;
    return ComponentWithContext;
}