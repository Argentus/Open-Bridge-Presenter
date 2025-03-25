import { Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { cloneElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface MainNavigationButtonProps {
    title: string;
    icon: React.ReactElement;
    onClick?: () => void;
    link?: string;
    color?: string;
    blink?: boolean;
}

const MainNavigationButton = ({ title, icon, onClick, link, color, blink }: MainNavigationButtonProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = link && location.pathname === link;

    color = color || (isActive ? 'primary.100' : 'neutral.500');
    const blinkAnimation = keyframes`
        0% { opacity: 0.6 }
        30% { opacity: 0.6 }
        50% { opacity: 1 }
        80% { opacity: 1 }
        100% { opacity: 0.6 }
        `;


    const handleClick = () => {
        if (link) {
            navigate(link);
        } else if (onClick) {
            onClick();
        }
    }

    return (
        <Flex
            background={ isActive ? 'transparent' :
                {
                    base: 'transparent',
                    _hover: 'rgba(255,255,255,0.03)'
                }
            }
            transition='background 0.2s ease, color 0.2s ease, margin-right 0.2s ease, border-radius 0.5s ease'
            cursor='pointer'
            h='50px'
            w='130px'
            alignContent='center'
            onClick={handleClick}
            color={color}
            title={title}
            animation={blink ? `${blinkAnimation} 2s infinite` : undefined}
            direction='column'
            alignItems='end'
            justifyContent='center'
            borderRadius='md'
            pr='35px'
            mb='8px'
            mr={isActive ? '-6px' : '8px'}
            borderRightRadius={isActive ? 'md' : undefined}
            boxShadow={isActive ? '0 2px 3px 1px rgba(0,0,0,0.1)' : ''}
            position='relative'
            overflow='hidden'
            zIndex={50}
        >
            {
            // @ts-ignore
            cloneElement(icon, { color: color, style: {width: "16px", height: "16px"} })
            }
            <Text
                mt='6px'
                fontSize='8px'
                color={isActive ? 'primary.300' : 'primary.500'}
                textTransform={'uppercase'}
                letterSpacing={'0.2em'}
                position='relative'
                zIndex={300}
            >
                {title}
            </Text>
        </Flex>
    );
}

export default MainNavigationButton;