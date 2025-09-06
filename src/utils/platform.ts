const ua = navigator.userAgent || navigator.vendor || (window as any).opera;

export const isAndroid = /android/i.test(ua);
export const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
export const isMobile = isAndroid || isIOS;