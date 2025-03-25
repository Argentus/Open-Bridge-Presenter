import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { MessageType, onMessage, ProjectionScreenResizeMessage, sendMessage } from '../app/projectionComm';
import { Slide, BLANK_SLIDE } from '../../../common/types';
import { ScreenMode, SlideTheme } from '../app/types';

interface ProjectionContextProps {
    projectionScreenOpen: boolean;
    setProjectedSlide: (slide: Slide) => void;
    setProjectionTheme: (theme: SlideTheme) => void;
    setProjectionScreenMode: (mode: ScreenMode) => void;
    projectorScreenSize: { width: number, height: number };
    slide: Slide | null;
    theme: SlideTheme | null;
    screenMode: ScreenMode;
    closeProjection: () => void;
    openProjection: () => void;
}

const ProjectionContext = createContext<ProjectionContextProps | undefined>(undefined);

export const ProjectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [projectedSlide, setProjectedSlide] = useState<Slide|null>(null);
    const [projectorScreenSize, setProjectorScreenSize] = useState({ width: 0, height: 0 });
    const [projectionScreenMode, setProjectionScreenMode] = useState<ScreenMode>('show');
    const [projectionTheme, setProjectionTheme] = useState<SlideTheme | null>(null);
    const [projectionOpen, setProjectionOpen] = useState(false);


    const projectionOpenRef = useRef(projectionOpen);
    const projectionAliveWatchdogRef = useRef(0);

    useEffect(() => {
        projectionOpenRef.current = projectionOpen;
    }, [projectionOpen]);

    useEffect(() => {
        sendMessage({ type: MessageType.SET_SLIDE, slide: projectedSlide || BLANK_SLIDE });
    }, [projectedSlide]);
    useEffect(() => {
        sendMessage({ type: MessageType.SET_SCREEN_MODE, mode: projectionScreenMode });
    }, [projectionScreenMode]);
    useEffect(() => {
        sendMessage({ type: MessageType.SET_THEME, theme: projectionTheme || {} });
    }, [projectionTheme]);

    const openProjection = () => {
        window.open("#/projector", "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=800,height=600,noopener,noreferrer");
    };

    const closeProjection = () => {
        sendMessage({ type: MessageType.CLOSE_PROJECTION });
        setProjectionOpen(false);
    };

    function handleProjectionWatchdog () {
        if (projectionOpenRef.current) {
            if (projectionAliveWatchdogRef.current >= 2) {
                setProjectionOpen(false);
                projectionAliveWatchdogRef.current = 0;
            } else {
                projectionAliveWatchdogRef.current++;
            }
        }
    };

    useEffect(function () {
        if (projectionOpenRef.current) {
            // Init projection screen with current state
            sendMessage({ type: MessageType.SET_SLIDE, slide: projectedSlide || BLANK_SLIDE });
            sendMessage({ type: MessageType.SET_SCREEN_MODE, mode: projectionScreenMode });
            sendMessage({ type: MessageType.SET_THEME, theme: projectionTheme || {} });
        } else {
            setProjectorScreenSize({ width: 0, height: 0 });
            console.log("Projection screen closed.");
        }
    }, [projectionOpen]);

    useEffect(function () {
        // Check if projection is alive
        const intervalId = window.setInterval(handleProjectionWatchdog, 1000);

        // Listen for messages from projection screen
        onMessage(MessageType.PROJECTION_HEARTBEAT, function () {
            projectionAliveWatchdogRef.current = 0;
            if (!projectionOpenRef.current) {
                setProjectionOpen(true);
            }
        });

        onMessage(MessageType.PROJECTION_SCREEN_RESIZE, (message) => {
            message = message as ProjectionScreenResizeMessage;
            setProjectorScreenSize({ width: message.width, height: message.height });
        });

        onMessage(MessageType.PROJECTION_CLOSING, () => {
            setProjectionOpen(false);
            console.log("Projection screen closed.");
        });

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const contextValue = {
        projectionScreenOpen: projectionOpen,
        setProjectedSlide,
        setProjectionTheme,
        setProjectionScreenMode,
        projectorScreenSize,
        slide: projectedSlide,
        theme: projectionTheme,
        screenMode: projectionScreenMode,
        closeProjection,
        openProjection
    }

    return (
        <ProjectionContext.Provider value={contextValue}>
            {children}
        </ProjectionContext.Provider>
    );
};

export const useProjection = (): ProjectionContextProps => {
    const context = useContext(ProjectionContext);
    if (!context) {
        throw new Error('useProjection must be used within a ProjectionProvider');
    }
    return context;
};