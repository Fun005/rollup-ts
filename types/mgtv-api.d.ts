interface CashOption {
    iapType: string
    pagename: string
    actid: string
    url: string
}

declare interface ShowShareMenusOptions {
    title: string
    desc?: string
    shareIcon?: string
    shareUrl: string
}

declare interface MgtvApiInterface {
    login (cb: () => void): void
    getDeviceInfo (cb: (data: string) => void): void
    getUserInfo (cb: (data: Record<string, unknown>) => void): void
    openCashier (option: CashOption): void
    showShare (): void
    showShareMenus (options: ShowShareMenusOptions, callback: (res?: string) => void): void
    jumpPage (params: { url: string }): void
    callHandler (command: string, params: object, callback: (res?: string) => void): void
    registerHandler: (name: string, callback: (res?: string) => void) => void
    setupWebViewJavascriptBridge: (bridgeGetter: (bridge: MgtvApiInterface) => void) => void
}
