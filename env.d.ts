/// <reference types="vite/client" />

declare module '*.pdf' {
    const src: string
    export default src
}

declare module 'page-flip' {
    export class PageFlip {
        constructor(element: HTMLElement, settings: Record<string, unknown>)
        loadFromImages(images: string[]): void
        loadFromHTML(elements: NodeListOf<Element> | HTMLElement[]): void
        flipNext(corner?: string): void
        flipPrev(corner?: string): void
        flip(pageNum: number, corner?: string): void
        getCurrentPageIndex(): number
        getPageCount(): number
        on(event: string, callback: (e: unknown) => void): void
        destroy(): void
    }
}
