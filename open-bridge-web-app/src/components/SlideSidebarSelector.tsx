import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { ForceRedrawable, LyricsFontSize, Slide } from "../app/types";
import IncreaseFontIcon from "../assets/zoom-in-svgrepo-com.svg?react";
import DecreaseFontIcon from "../assets/zoom-out-svgrepo-com.svg?react";
import TextAlignCenterIcon from "../assets/align-text-center-svgrepo-com.svg?react";
import TextAlignLeftIcon from "../assets/align-text-left-svgrepo-com.svg?react";
import TextAlignRightIcon from "../assets/align-text-right-svgrepo-com.svg?react";
import { Fragment, useEffect, useRef } from "react";
import { useProjection } from "../context/ProjectionContext";

export interface SlideSidebarButtonProps extends ForceRedrawable {
    slide: Slide;
    active?: boolean;
    setActive?: () => void;
    onUpdateSlide?: (slide: Slide) => void;
}
const SlideSidebarSelector = ({slide, active, setActive, onUpdateSlide}:SlideSidebarButtonProps) => {

    const {projectorScreenSize} = useProjection();

    const ref = useRef<HTMLDivElement>(null);

    const screenWidth = projectorScreenSize.width || 1920;
    const screenHeight = projectorScreenSize.height || 1080;
    const scaleFactor = screenWidth / 230;

    const previewWidth = Math.round(screenWidth / scaleFactor);
    const previewHeight = Math.round(screenHeight / scaleFactor);
    const fontSize = "" + Math.round(LyricsFontSize[slide.fontSize] / scaleFactor) + "px";

    const textAlign = slide.textAlign;

    const onSwitchTextAlign = () => {
        const textAlign = slide.textAlign === 'center' ? 'left' : (
            slide.textAlign === 'left' ? 'right' : 'center'
        );
        slide.textAlign = textAlign;
        onUpdateSlide && onUpdateSlide(slide);
    }

    const onChangeFontSize = (delta: number) => {
        const fontSize = slide.fontSize + delta;
        if (fontSize >= 1 && fontSize <= 9) {
            slide.fontSize = fontSize as 1|2|3|4|5|6|7|8|9;
            onUpdateSlide && onUpdateSlide(slide);
        }
    }

    useEffect(() => {
        active &&
            ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [active]);

    return (
        <Box ref={ref} p='14px 30px' m='7px 25px 7px 7px' position='relative' left='20px' css={{'&:hover .slide-quick-actions-bar': {opacity: 1}}}
            transition='background-image ease 0.05s' borderRadius={'5px'}
            bgImage={
                active ? 
                { 
                    base: 'linear-gradient(90deg, {colors.primary.700}, {colors.primary.600})',
                    _hover: 'linear-gradient(90deg, {colors.primary.700}, {colors.primary.500})'
                } : 
                {
                    base: 'transparent', 
                    _hover: 'linear-gradient(90deg, rgba(255,255,255,0.01), rgba(255,255,255,0.02))'
                }
            }
        >
            <Flex direction='row'>
                <Box w={previewWidth + "px"} h={previewHeight + "px"}
                    bg='neutral.900' pl={slide?.textAlign == 'left' ? "10%" : 0} pr={slide?.textAlign == 'right' ? "10%" : 0}
                    color='white' alignContent='center'
                    boxShadow={
                        'rgba(0,0,0,0.7) inset 0 0 30px, 3px 0px 8px 0px rgba(0,0,0,0.5)'
                    }
                    onClick={setActive || undefined}
                    cursor='pointer'
                    overflow='hidden'
                    borderRadius='5px'
                >
                    <Text wordWrap='normal' textAlign={textAlign} fontSize={fontSize}>
                        {
                            slide.content.split('\n').map((line, i) => (
                                <Fragment key={i}>
                                    {line}
                                    <br/>
                                </Fragment>
                            ))
                        }
                    </Text>
                </Box>
                <Flex direction='column'
                    className='slide-quick-actions-bar'
                    w='20px' h='100%' ml='5px' transition={'ease-in-out 0.05s'}
                    opacity='0'
                >
                        <IconButton color={{base: 'neutral.300', _hover: 'neutral.600'}} size='xs' variant='ghost' onClick={() => onChangeFontSize(1)}>
                            <IncreaseFontIcon/> 
                        </IconButton>
                        <IconButton color={{base: 'neutral.300', _hover: 'neutral.600'}} size='xs' variant='ghost'  onClick={() => onChangeFontSize(-1)}>
                            <DecreaseFontIcon/>
                        </IconButton>
                        <IconButton color={{base: 'neutral.300', _hover: 'neutral.600'}} size='xs' variant='ghost'  
                            onClick={onSwitchTextAlign}
                        >
                            {
                                slide.textAlign === 'center' ? 
                                    <TextAlignLeftIcon/> : (
                                slide.textAlign === 'left' ?
                                    <TextAlignRightIcon/> :
                                // slide.textAlign === 'right'
                                    <TextAlignCenterIcon/>
                                )
                            }
                        </IconButton>
                </Flex>

            </Flex>
        </Box>
    );
}

export default SlideSidebarSelector;