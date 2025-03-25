import { Box, chakra, IconButton, Link, Text } from "@chakra-ui/react";
import { CurrentSetlistContextProps, withCurrentSetlistContext } from "../context/CurrentSetlistContext";
import { CurrentSongContextProps, withCurrentSongContext } from "../context/CurrentSongContext";
import { useNavigate } from "react-router-dom";
import { Song } from "../app/types";
import EditableTitle from "../components/EditableTitle";
import Frame from "../components/Frame";
import SongSidebarSelector from "../components/SongSidebarSelector";
import AddNewSvg from "../assets/lines-plus-svgrepo-com.svg?react";

export interface SetlistSidebarProps extends CurrentSetlistContextProps, CurrentSongContextProps {
}
const SetlistSidebar = ({currentSetlist, updateCurrentSetlist, updateCurrentSong}: SetlistSidebarProps) => {

    updateCurrentSetlist; // TS shut up
    const navigate = useNavigate();

    const handleSelectSong = (song: Song) => {
        updateCurrentSong(song);
        navigate("/song");
    }

    const handleUpdateTitle = (title: string) => {
        if (currentSetlist) {
            currentSetlist.title = title;
            updateCurrentSetlist(currentSetlist);
        }
    }

    return (
        <Frame direction='column' w='400px' flexGrow={1} p='0px' variant="invisible">
            <chakra.header
                pb='10px'
                boxShadow='0 7.95px 5px -6px rgba(0,0,0,0.4)'
                position='relative'
                zIndex='300'
            >
                <EditableTitle 
                    title={currentSetlist?.title}
                    updateTitle={handleUpdateTitle}
                    placeholder='Názov setlistu'
                />
            </chakra.header>
            { !!currentSetlist && currentSetlist.songs.length > 0 ? (
                <Box overflowY='auto' overflowX='hidden'>
                    <chakra.ul p='20px 8px'>
                        {currentSetlist.songs.map((song, index) => (
                            <SongSidebarSelector
                                key={index}
                                song={song}
                                selectSong={handleSelectSong}
                            />
                        ))}
                    </chakra.ul>

                </Box>
            ) : (
                <Text> Nič tu nemáš, bež na 4334 a pridaj nejaké piesne! </Text>
            )
            }
            <chakra.footer
                p='20px 15px'
                boxShadow='0 -7.95px 5px -6px rgba(0,0,0,0.4)'
                position='relative'
                zIndex='300'
            >
                <IconButton
                    variant='ghost'
                    size='sm'
                    w='100%'
                    as={Link}
                    // @ts-ignore
                    href='http://4334.sk/piesne'
                    target='blank'
                >
                    <AddNewSvg/>
                    Nájsť piesne na 4334.sk
                </IconButton>

            </chakra.footer>
        </Frame>
    );
}

export default withCurrentSetlistContext(withCurrentSongContext(SetlistSidebar));