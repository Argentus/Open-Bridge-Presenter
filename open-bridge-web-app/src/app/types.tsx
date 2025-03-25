import {Song, Setlist, Slide} from '../../../common/types';

export type { Song };
export type { Setlist };
export type { Slide };

export const LyricsFontSize = {
    1: 32,
    2: 43,
    3: 54,
    4: 65,
    5: 76,
    6: 87,
    7: 98,
    8: 109,
    9: 120
};

export interface ForceRedrawable {
    forceRedraw?: number;
}

export interface SlideTheme {
    name?: string;
    bgType?: 'color' | 'image' | 'video';
    bgValue?: string;
    bgOverlay?: number;
    vignette?: string;
    textColor?: string;
    textShadow?: string;
    textFont?: string;
    textWeight?: string;
}

export type ScreenMode = 'show' | 'blank' | 'black' | 'white';
