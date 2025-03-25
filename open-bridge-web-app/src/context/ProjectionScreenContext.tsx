import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MessageType, onMessage, sendMessage, SetScreenModeMessage, SetSlideMessage, SetThemeMessage } from '../app/projectionComm';
import { BLANK_SLIDE, Slide } from '../../../common/types';
import { ScreenMode, SlideTheme } from '../app/types';

interface ProjectionScreenContextProps {
    heartbeat: () => void;
    screenResized: (width: number, height: number) => void;
    slide: Slide | null;
    theme: SlideTheme | null;
    screenMode: ScreenMode;
    dead: boolean;
}

const ProjectionScreenContext = createContext<ProjectionScreenContextProps | undefined>(undefined);

export const ProjectionScreenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [slide, setSlide] = useState<Slide>(BLANK_SLIDE);
    const [theme, setTheme] = useState<SlideTheme | null>(null);
    const [screenMode, setScreenMode] = useState<ScreenMode>('show');
    const [dead, setDead] = useState(false);

    const heartbeat = () => {
        sendMessage({ type: MessageType.PROJECTION_HEARTBEAT });
    };

    const screenResized = (width: number, height: number) => {
        sendMessage({ type: MessageType.PROJECTION_SCREEN_RESIZE, width, height });
    };

    useEffect(() => {
        // Listen for messages from control room
        onMessage(MessageType.SET_SLIDE, (message) => {
            message = message as SetSlideMessage;
            setSlide(message.slide);
        });
        onMessage(MessageType.SET_SCREEN_MODE, (message) => {
            message = message as SetScreenModeMessage;
            setScreenMode(message.mode);
        });
        onMessage(MessageType.SET_THEME, (message) => {
            message = message as SetThemeMessage;
            console.log("Change theme: ", message.theme);
            setTheme(message.theme);
        });
        onMessage(MessageType.CLOSE_PROJECTION, () => {
            setDead(true);
        });

        return () => {
            sendMessage({ type: MessageType.PROJECTION_CLOSING });
        };
    }, []);

    const contextValue = {
        heartbeat,
        screenResized,
        slide,
        theme,
        screenMode,
        dead,
    };

    return (
        <ProjectionScreenContext.Provider value={contextValue}>
            {children}
        </ProjectionScreenContext.Provider>
    );
};

export const useProjectionScreen = (): ProjectionScreenContextProps => {
    const context = useContext(ProjectionScreenContext);
    if (!context) {
        throw new Error('useProjection must be used within a ProjectionProvider');
    }
    return context;
};