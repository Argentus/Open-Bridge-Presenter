// This is used for communication between projection screen and control room

import { ScreenMode, Slide, SlideTheme } from "./types";

const CHANNEL_NAME = 'open-bridge-projection';
export const broadcastChannel = new BroadcastChannel(CHANNEL_NAME);

export enum MessageType {
    PROJECTION_HEARTBEAT = 'PROJECTION_HEARTBEAT',
    PROJECTION_SCREEN_RESIZE = 'PROJECTION_SCREEN_RESIZE',
    PROJECTION_CLOSING = 'PROJECTION_CLOSING',
    SET_SLIDE = 'SET_SLIDE',
    SET_SCREEN_MODE = 'SET_SCREEN_MODE',
    SET_THEME = 'SET_THEME',
    CLOSE_PROJECTION = 'CLOSE_PROJECTION',
}

export interface ProjectionHeartbeatMessage {
    type: MessageType.PROJECTION_HEARTBEAT;
}
export interface ProjectionScreenResizeMessage {
    type: MessageType.PROJECTION_SCREEN_RESIZE;
    width: number;
    height: number;
}
export interface ProjectionClosingMessage {
    type: MessageType.PROJECTION_CLOSING;
}
export interface SetSlideMessage {
    type: MessageType.SET_SLIDE;
    slide: Slide;
}
export interface SetScreenModeMessage {
    type: MessageType.SET_SCREEN_MODE;
    mode: ScreenMode;
}
export interface SetThemeMessage {
    type: MessageType.SET_THEME;
    theme: SlideTheme;
}
export interface CloseProjectionMessage {
    type: MessageType.CLOSE_PROJECTION;
}

export type Message = ProjectionHeartbeatMessage | ProjectionScreenResizeMessage | SetSlideMessage | SetScreenModeMessage | SetThemeMessage | CloseProjectionMessage | ProjectionClosingMessage;

export const sendMessage = (message: Message) => {
    broadcastChannel.postMessage(message);
};

export const onMessage = (type: MessageType, callback: (message: Message) => void) => {
    broadcastChannel.addEventListener("message", (event) => {
        if (event.data.type === type) {
            callback(event.data);
        }
    });
};