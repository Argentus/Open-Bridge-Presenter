// common/comm.ts

import { Song } from "./types";

// Define the channel name
const CHANNEL_NAME = 'open-bridge-extensions';

// Create a BroadcastChannel instance
export const broadcastChannel = new BroadcastChannel(CHANNEL_NAME);

// Define message types
export enum MessageType {
    WEBAPP_HEARTBEAT = 'WEBAPP_HEARTBEAT',
    COMPANION_HEARTBEAT = 'COMPANION_HEARTBEAT',
    IMPORT_SONGS = 'IMPORT_SONGS',
    SONGS_IMPORTED = 'SONGS_IMPORTED',
}

export interface WebappHeartbeatMessage {
    type: MessageType.WEBAPP_HEARTBEAT;
}
export interface CompanionHeartbeatMessage {
    type: MessageType.COMPANION_HEARTBEAT;
}
export interface ImportSongsMessage {
    type: MessageType.IMPORT_SONGS;
    data: Song[];
}
export interface SongsImportedMessage {
    type: MessageType.SONGS_IMPORTED;
    data: Song[];
}

export type Message = WebappHeartbeatMessage | ImportSongsMessage | SongsImportedMessage;

// Function to send a message
export const sendMessage = (message: Message) => {
    broadcastChannel.postMessage(message);
};

// Function to listen for messages
export const onMessage = (type: MessageType, callback: (message: Message) => void) => {
    broadcastChannel.addEventListener("message", (event) => {
        if (event.data.type === type) {
            callback(event.data);
        }
    });
};