import { chakra, Flex } from "@chakra-ui/react";
import SlideSidebarSelector from "../components/SlideSidebarSelector";
import { ForceRedrawable, Slide, Song } from "../app/types";
import { useEffect, useRef, useState } from "react";
import { CurrentSongContextProps, withCurrentSongContext } from "../context/CurrentSongContext";
import Frame from "../components/Frame";
import EditableTitle from "../components/EditableTitle";
import { useProjection } from "../context/ProjectionContext";

export interface SongSidebarProps extends CurrentSongContextProps, ForceRedrawable {
    currentSong: Song;
    onUpdateCurrentSong?: (song: Song) => void;
}
const SongSidebar = ({currentSong: song, onUpdateCurrentSong: onUpdateSong}:SongSidebarProps) => {
    
    if (!song) return <></>;

    const projection = useProjection();
    const [activeSlide, setActiveSlide] = useState<Slide|null>(projection.slide);
    const [activeSlideIndex, setActiveSlideIndex] = useState<number|null>(song.slides.findIndex(s => s === projection.slide));
    const [forceRedraw, setForceRedraw] = useState<number>(0);

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (activeSlide !== null) {
            projection.setProjectedSlide(activeSlide);
        }
    }, [activeSlide]);

    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            if (activeSlideIndex !== null && activeSlideIndex < song.slides.length - 1) {
                setActiveSlide(song.slides[activeSlideIndex + 1]);
                setActiveSlideIndex(activeSlideIndex + 1);
            }
        } else if (event.key === 'ArrowUp') {
            if (activeSlideIndex !== null && activeSlideIndex > 0) {
                setActiveSlide(song.slides[activeSlideIndex - 1]);
                setActiveSlideIndex(activeSlideIndex - 1);
            }
        }
    }

    const handleUpdateSlide = (index: number, slide: Slide) => {
        song.slides[index] = slide;
        onUpdateSong && onUpdateSong(song);
        setForceRedraw(forceRedraw + 1);
    }

    const handleUpdateSongTitle = (title: string) => {
        song.title = title;
        onUpdateSong && onUpdateSong(song);
        setForceRedraw(forceRedraw + 1);
    }

    return (
        <Frame direction='column' w='400px' flexGrow={1} p='0px'
            onKeyUp={handleKeyUp} tabIndex={0}
            variant='invisible'
        >
            <chakra.header
                pb='10px'
                boxShadow='0 7.95px 5px -6px rgba(0,0,0,0.06);'
            >
                <EditableTitle
                    title={song.title}
                    updateTitle={handleUpdateSongTitle}
                    placeholder='Názov piesne'
                    caps={true}
                />
            </chakra.header>
            <Flex overflowY='auto' overflowX='hidden' pt='25px' pl='0px' ref={listRef} direction='column' alignItems='left'
            >
                {song.slides.map((slide, index) => (
                    <SlideSidebarSelector
                        key={index}
                        slide={slide}
                        active={activeSlideIndex === index}
                        setActive={() => {
                            setActiveSlide(slide);
                            setActiveSlideIndex(index);
                        }}
                        forceRedraw={forceRedraw}
                        onUpdateSlide={(slide: Slide) => {
                            handleUpdateSlide(index, slide);
                            console.log("Updated slide", slide);
                        }}
                    />
                ))}
            </Flex>
            <chakra.footer
                p='20px 15px'
                boxShadow='0 -7.95px 5px -6px rgba(0,0,0,0.06);'
            >

            </chakra.footer>
        </Frame>
    );
}

export default withCurrentSongContext(SongSidebar);