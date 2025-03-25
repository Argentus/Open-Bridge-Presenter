import { Box, Flex, Heading, HStack, IconButton, Image, Link, Text, VStack } from "@chakra-ui/react"
import { Song } from "../app/types";
import { useRef } from "react";

export interface SongSidebarSelectorProps {
    song: Song;
    selectSong: (song: Song) => void;
}
const SongSidebarSelector = ({song, selectSong}: SongSidebarSelectorProps) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <Box ref={ref} transition='background 0.1s ease' p='15px 30px' pl='20px' pr='10px' m='7px 4px' cursor='pointer' position='relative' css={{'&:hover .slide-quick-actions-bar': {opacity: 1}}} onClick={() => selectSong(song)} bg={{base: 'transparent', _hover: 'primary.800'}} borderRadius={'5px'}>
            <Flex direction='row' pl='25px' w='100%'>
                { false && 
                    <Image borderRadius='full' mr='8px' boxSize="40px" src={song.albumImageURL} alt={`${song.album} cover`} />
                }
                <VStack align="start" lineHeight={1.1} gap={0}>
                    <Heading as='h5' textTransform='uppercase' fontWeight='400' fontSize='14px' mb='4px' color='neutral.300' lineHeight={1}>{song.title}</Heading>
                    <Text fontSize='11px'>
                        <Link target='_blank' href={song.artistURL} mr='10px' textDecor={{base: 'none', _hover: 'underline'}} color={{base: 'neutral.500', _hover: 'neutral.400'}} onClick={(e) => e.stopPropagation()}>
                            {song.artist}
                        </Link>
                        |
                        <Link target='_blank' href={song.albumURL} ml='10px' textDecor={{base: 'none', _hover: 'underline'}} color={{base: 'neutral.500', _hover: 'neutral.400'}} onClick={(e) => e.stopPropagation()}>
                            {song.album}
                        </Link>
                    </Text>
                </VStack>
                <IconButton
                    as={Link}
                    aria-label="Link to song"
                    size="xs"
                    variant="ghost"
                    justifySelf='end'
                />
            </Flex>
        </Box>
    );
}
export default SongSidebarSelector;