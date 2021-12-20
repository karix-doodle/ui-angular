// Route Management Summary //

export class RouteMgmtSummary {
    responsecode: number;
    responsestatus: string;
    data: SummaryData;
    message?: string;
}

export class SummaryData {
    lcr: LcrObj;
    pool: any;
    custom: CustomObj;
    blacklist: BlackListObj;
}

export class LcrObj {
    direct: number;
    premium: number;
    wholesale: number;
    mixed:number; /** ID-173 */
}

export class PoolObj {
}

export class CustomObj {
    mobile: number;
    mobile_senderid: number;
    senderid_template: number;
}

export class BlackListObj {
    mobile: number;
    mobile_senderid: number;
    senderid_template: number;
}

// Route Management Summary //