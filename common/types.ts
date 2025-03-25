export interface Slide {
    content: string;
    fontSize: 1|2|3|4|5|6|7|8|9;
    title?: string;
    textAlign: 'center' | 'left' | 'right';
}

export interface Song {
    title: string;
    url?: string;
    artist?: string;
    artistURL?: string;
    album?: string;
    albumURL?: string;
    albumImageURL?: string;
    slides: Slide[];
}

export interface Setlist {
    title?: string;
    dateCreated?: Date;
    dateUpdated?: Date;
    songs: Song[];
}

export const BLANK_SLIDE: Slide = {
    content: '',
    fontSize: 5,
    textAlign: 'center'
}

export const BLANK_SETLIST: Setlist = {
    songs: []
}

export const BLANK_SONG: Song = {
    title: '',
    slides: []
}