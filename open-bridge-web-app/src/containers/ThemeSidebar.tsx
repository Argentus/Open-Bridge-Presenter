import { Box, chakra, Flex, Text } from "@chakra-ui/react";
import Frame from "../components/Frame";
import EditableTitle from "../components/EditableTitle";
import { useProjection } from "../context/ProjectionContext";
import { SlideTheme } from "../app/types";
import { useEffect, useState } from "react";
import { bgOverlayToCSS } from "../app/utils";

const ThemeSidebar = () => {

    const projection = useProjection();
    const [slideThemes, setSlideThemes] = useState<SlideTheme[]>([]);

    useEffect(() => {

        // Load slide themes
        if (chrome && chrome.runtime && chrome.runtime.id) {
            chrome.storage.local.get("slideThemes", (data) => {
            if (data.slideThemes) {
                setSlideThemes(data.slideThemes);
            }
            });
        }

        setSlideThemes([
            { bgType: 'color', bgValue: '#000000' },
            { bgType: 'color', bgValue: '#ffffff', textColor: '#111111', textWeight: '300' },
            { bgType: 'image', bgValue: 'https://images.unsplash.com/photo-1738869786881-c13c7898bc49?q=70', bgOverlay: -30, textShadow: '2px 2px 2px rgba(255, 255, 255, 0.66)' },
            { bgType: 'video', bgValue: 'https://cdn.pixabay.com/video/2017/06/05/9584-220312371_large.mp4', bgOverlay: -60, textShadow: '2px 2px 2px rgba(255, 0, 242, 0.5)' }
        ]);
    }, []);

    const updateSlideThemes = (themes: SlideTheme[]) => {
        setSlideThemes(themes);
        if (chrome && chrome.storage) {
            chrome.storage.local.set({ slideThemes: themes });
        }
    }

    updateSlideThemes;

    return (
        <Frame direction='column' w='400px' p='0px' flexGrow={1} variant='invisible'>

            <chakra.header
                pb='10px'
                boxShadow='0 7.95px 5px -6px rgba(0,0,0,0.06);'
            >
                <EditableTitle
                    title='Témy'
                    caps={true}
                />
            </chakra.header>

            <Flex>
                {   slideThemes.map((theme, i) => {
                        let boxBg: string|undefined = "transparent";
                        if (theme.bgType === 'color') {
                            boxBg = theme.bgValue;
                        } else if (theme.bgType === 'image') {
                            boxBg = `url(${theme.bgValue})`;
                        }
                        console.log(theme);
                        return (
                            <Flex key={i} w='70px' h='70px' m='10px'
                                borderRadius='5px' boxShadow='0 0 5px rgba(0,0,0,0.2)'
                                position='relative'
                                bg={boxBg} backgroundSize='cover'
                                overflow='hidden'
                                alignItems='center'
                                justifyContent='center'
                                onClick={() => projection.setProjectionTheme(theme)}
                            >
                                {
                                    theme.bgType === 'video' && <>
                                        <chakra.video zIndex={100} position='absolute' w='100%' h='100%' autoPlay={false} loop muted objectFit='cover'>
                                            <source src={theme.bgValue} type='video/mp4'/>
                                        </chakra.video>
                                    </>
                                }
                                <Box zIndex={200} position='absolute' w='100%' h='100%' bg={bgOverlayToCSS(theme.bgOverlay || 0)}/>
                                <Text position='relative' fontSize='30px' zIndex={300}
                                    color={theme.textColor || 'white'}
                                    textShadow={theme.textShadow}
                                    fontWeight={theme.textWeight}
                                >
                                    Aa
                                </Text>
                            </Flex>
                        );
                    })
                }
            </Flex>


        </Frame>
    )
}

export default ThemeSidebar;