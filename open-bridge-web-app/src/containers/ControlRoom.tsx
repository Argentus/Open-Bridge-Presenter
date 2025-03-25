import { chakra, Box, Flex, Text } from "@chakra-ui/react";
import { useProjection } from "../context/ProjectionContext";
import { LyricsFontSize } from "../app/types";
import { Fragment } from "react/jsx-runtime";
import { bgOverlayToCSS } from "../app/utils";

function ControlRoom() {
    const {slide, theme, screenMode, projectorScreenSize} = useProjection();

    const screenWidth = projectorScreenSize.width || 1920;
    const screenHeight = projectorScreenSize.height || 1080;
    const scaleFactor = screenWidth / 600;

    const previewWidth = Math.round(screenWidth / scaleFactor);
    const previewHeight = Math.round(screenHeight / scaleFactor);
    const fontSize = "" + Math.round(LyricsFontSize[slide?.fontSize || 5] / scaleFactor) + "px";

    let boxBg: string|undefined = "transparent";
    if (theme?.bgType === 'color') {
        boxBg = theme?.bgValue || 'black';
    } else if (theme?.bgType === 'image') {
        boxBg = `url(${theme?.bgValue})`;
    }
    return (
        <Flex direction='column' flexGrow={1} alignItems='center' justifyContent='center'
                backgroundImage={
                "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='black' fill-opacity='0.04' fill-rule='evenodd'/%3E%3C/svg%3E\")"
                }
                boxShadow=''
        >

                <Box
                borderRadius='12px'
                pl={slide?.textAlign == 'left' ? "10%" : 0}
                pr={slide?.textAlign == 'right' ? "10%" : 0} m='0'
                height={'' + previewHeight + 'px'} width={'' + previewWidth + 'px'}
                alignContent='center' overflow='hidden'
                position='relative'
                bg={boxBg} backgroundSize='cover'
                boxShadow='{shadows.neon.500}'
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

        </Flex>
    );
}

export default ControlRoom;