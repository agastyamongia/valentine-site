/// <reference types="vite/client" />

// Additional image type declarations for non-standard extensions
declare module '*.PNG' {
    const src: string;
    export default src;
}

declare module '*.JPG' {
    const src: string;
    export default src;
}

declare module '*.JPEG' {
    const src: string;
    export default src;
}
