import { Flex, FlexProps } from "@chakra-ui/react";

export interface FrameProps extends FlexProps{
    variant?: 'subtle'|'sharp'|'invisible'
}
const Frame = ({children, variant, ...props}: FrameProps) => {

    const shadows = {
        subtle: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;',
        sharp: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px, rgba(17, 12, 46, 0.06) 0px 48px 100px 0px;',
        'var3': 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;',
        invisible: 'none'
    };

    return (
        <Flex
            borderRadius='5px'
            marginTop='20px'
            marginBottom='20px'
            padding='15px 10px'
            boxShadow={shadows[variant || 'var3']}
            {...props}
        >
            {children}
        </Flex>
    );
}

export default Frame;