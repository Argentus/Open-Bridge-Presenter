import React, { useEffect } from 'react';
import MainMenu from '../containers/MainMenu';
import { Box, Flex } from '@chakra-ui/react';
import { Setlist, Song } from '../app/types';
import { Outlet } from 'react-router-dom';
import ControlRoom from '../containers/ControlRoom';

export interface HomeScreenProps {
  activeSetlist: Setlist;
  onUpdateActiveSetlist: (setlist: Setlist) => void;
}
const HomeScreen = ({activeSetlist}: HomeScreenProps) => {

  const [currentSong, setCurrentSong] = React.useState<Song|null>(activeSetlist?.songs.length > 0 ? activeSetlist.songs[0] : null);

  useEffect(() => {
    if (!currentSong && !!activeSetlist && activeSetlist.songs?.length > 0) {
      setCurrentSong(activeSetlist.songs[0]);
    }
  }, [activeSetlist]);

  return (
    <Box h='100vh' w='100%'
      bgImage='linear-gradient(120deg, {colors.neutral.800}, {colors.neutral.700})'
    >
      <Flex direction='row' position='relative' h='100%' w='100%' maxW='1600px' m='auto'>
      <MainMenu/>
      <Flex direction='row' flexGrow={1}
        p='0px' m='25px 20px' ml='0'
        borderRadius='lg' background='neutral.800'
        overflow='hidden'
        boxShadow='8px 4px 25px 5px rgba(0,0,0,0.65)'
        scrollbarColor='{colors.neutral.800} {colors.neutral.700}'
        scrollbarWidth='thin'
      >
        <Flex m='0px' p='0px'
          background='neutral.700'
          boxShadow='2px 0 3px 1px rgba(0,0,0,0.1)'
          zIndex={100}
          position='relative'
        >
          <Outlet/>
        </Flex>
        <ControlRoom/>
      </Flex>
      </Flex>

    </Box>
  );
};

export default HomeScreen;