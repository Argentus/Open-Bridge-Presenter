export function bgOverlayToCSS(overlay: number) {
    const opacity = Math.abs(overlay) / 255;
    if (overlay < 0) {
        return `rgba(0, 0, 0, ${opacity})`;
    } else {
        return `rgba(255, 255, 255, ${opacity})`;
    }
}