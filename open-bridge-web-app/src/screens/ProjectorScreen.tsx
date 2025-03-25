import React, { Fragment, useEffect } from 'react';
import { LyricsFontSize } from '../app/types';
import { Box, Text, chakra } from '@chakra-ui/react';
import { useProjectionScreen } from '../context/ProjectionScreenContext';
import { bgOverlayToCSS } from '../app/utils';

const ProjectorScreen: React.FC = () => {

  const {slide, theme, screenMode, heartbeat, dead, screenResized} = useProjectionScreen();
  
  useEffect(() => {
      window.addEventListener('resize', () => {
        screenResized(window.innerWidth, window.innerHeight);
      });
      screenResized(window.innerWidth, window.innerHeight);

      setInterval(() => {
        heartbeat();
      }, 1000);
  }
  , []);

  if (dead) {
    window.close();
  }

  const fontSize = "" + LyricsFontSize[slide?.fontSize || 5] + "px";
  let boxBg: string|undefined = "transparent";
  if (theme?.bgType === 'color') {
      boxBg = theme?.bgValue || 'black';
  } else if (theme?.bgType === 'image') {
      boxBg = `url(${theme?.bgValue})`;
  }

  return (
    <Box
      pl={slide?.textAlign == 'left' ? "10%" : 0}
      pr={slide?.textAlign == 'right' ? "10%" : 0} m='0'
      height='100vh' width='100vw'
      alignContent='center' overflow='hidden'
      position='relative'
      bg={boxBg} backgroundSize='cover'
    >
      {
          theme?.bgType === 'video' && <>
              <chakra.video top='0' zIndex={100} position='absolute' w='100%' h='100%' autoPlay={true} loop muted objectFit='cover'>
                  <source src={theme.bgValue} type='video/mp4'/>
              </chakra.video>
          </>
      }
      <Box top='0' zIndex={200} position='absolute' w='100%' h='100%' bg={bgOverlayToCSS(theme?.bgOverlay || 0)}/>

      {slide && ( <>
        <Text
          position='relative'
          wordWrap='normal' textAlign={slide.textAlign || 'center'}
          fontSize={fontSize}  zIndex={300}
          color={theme?.textColor || 'white'}
          textShadow={theme?.textShadow}
          fontWeight={theme?.textWeight}
          opacity={screenMode === 'show' ? 1 : 0}
          transition='opacity 0.5s ease'
        >
            {
                slide.content.split('\n').map((line, i) => (
                    <Fragment key={i}>
                        {line}
                        <br/>
                    </Fragment>
                ))
            }
        </Text>
        <Box top='0' position='absolute' w='100%' h='100%'
          bg='black' opacity={screenMode === 'black' ? 1 : 0} transition='opacity 0.5s ease'/>
        <Box top='0' position='absolute' w='100%' h='100%'
          bg='white' opacity={screenMode === 'white' ? 1 : 0} transition='opacity 0.5s ease'/>
      </>)}
    </Box>
  );
};

export default ProjectorScreen;