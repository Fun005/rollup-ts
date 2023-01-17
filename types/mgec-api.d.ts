declare type MgecApiRegisterHandler = (resp: any) => void

declare interface MgecApiInterface {
    callhandler (methodsName: string, option?: object, cb?: (data?: string) => void): void
    registerhandler: (name: string, params: any, handler: MgecApiRegisterHandler) => void
}

declare type EcReportFunc = (name: string, options: Record<string, string>) => void

declare var ecReport: EcReportFunc
