export {}

declare global {
    interface Window {
        api: {
            getAppList: () => Promise<{ name: string; version: string }[]>
        }
    }
}
