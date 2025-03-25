/// <reference types="vite-plugin-svgr/client" />
import { Box, Flex, chakra } from "@chakra-ui/react";
import SvgSong from "../assets/music-svgrepo-com.svg?react"
import SvgSetlist from "../assets/compact-disc-svgrepo-com.svg?react"
import SvgProjection from "../assets/video-camera-svgrepo-com.svg?react"
import SvgBackground from "../assets/image-svgrepo-com.svg?react"
import SvgSetlists from "../assets/folder-open-svgrepo-com.svg?react"
import MainNavigationButton from "../components/MainNavigationButton";
import { useProjection } from "../context/ProjectionContext";
import OpenBridgeLineLogo from "../assets/logo_line.png";

export interface MainMenuProps {
}
function MainMenu ({}: MainMenuProps) {

    const {projectionScreenOpen} = useProjection();

    return (
    <Flex ml='10px' mt='120px'  direction='column' alignItems='end' alignSelf='stretch'>
            <MainNavigationButton
                title="Song"
                icon={<SvgSong/>}
                link="/song"
            />
            <MainNavigationButton
                title="Set"
                icon={<SvgSetlist/>}
                link="/set"
            />

            <chakra.hr m='30px 5px' w='100%' border='none'/>

            <MainNavigationButton
                title="Projekcia"
                icon={<SvgProjection/>}
                link="/projection-settings"
                color={projectionScreenOpen ? 'red.400' : undefined}
                blink={projectionScreenOpen}
            />
            <MainNavigationButton
                title="Témy"
                icon={<SvgBackground/>}
                link="/themes"
            />
            <MainNavigationButton
                title="Setlisty"
                icon={<SvgSetlists/>}
                link="/setlists"
            />

            <Box flexGrow='1'/>

            <chakra.img
                src={OpenBridgeLineLogo} alt="Open Bridge Logo" 
                width="120px" height="120px"
                alignSelf='start'
                opacity='0.3'
                justifySelf='end'
                mb='40px'
            />

    </Flex>
)
}

export default MainMenu;