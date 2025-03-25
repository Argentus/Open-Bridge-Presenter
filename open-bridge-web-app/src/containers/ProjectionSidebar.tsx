import { chakra, IconButton, Text } from "@chakra-ui/react";
import Frame from "../components/Frame";
import SvgProjection from "../assets/video-camera-svgrepo-com.svg?react";
import EditableTitle from "../components/EditableTitle";
import { useProjection } from "../context/ProjectionContext";
import { SlideTheme } from "../app/types";
import { useEffect, useState } from "react";
import colors from "../app/theme/colors";

const ProjectionSidebar = () => {

    const projection = useProjection();
    const [slideThemes, setSlideThemes] = useState<SlideTheme[]>([]);
    slideThemes;

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

    const handleOpenCloseProjection = () => {
        if (projection.projectionScreenOpen) {
            projection.closeProjection();
        } else {
            projection.openProjection();
        }
    }

    return (
        <Frame direction='column' w='400px' p='0px' flexGrow={1} variant='invisible'>

            <chakra.header
                pb='10px'
                boxShadow='0 7.95px 5px -6px rgba(0,0,0,0.06);'
            >
                <EditableTitle
                    title='Projekcia'
                    caps={true}
                />
            </chakra.header>

            <IconButton
                mt='40px'
                onClick={handleOpenCloseProjection}
                variant='outline'
                size='2xl'
            >
                <SvgProjection color={projection.projectionScreenOpen ? colors.red[400].value : undefined}/>
                {projection.projectionScreenOpen ? 'Zavrieť' : 'Otvoriť'} projekciu
            </IconButton>

            { !!projection.projectorScreenSize.width &&
            <Text>
                Veľkosť projekčnej obrazovky: {projection.projectorScreenSize.width}x{projection.projectorScreenSize.height} px
            </Text>
            }



        </Frame>
    )
}

export default ProjectionSidebar;