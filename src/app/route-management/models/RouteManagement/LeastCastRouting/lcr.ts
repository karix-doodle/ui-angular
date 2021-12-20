// Route Management Lease Cost Route //
export class LCRList {
    responsecode: number;
    responsestatus: string;
    data: LCRListData;
    message?: string;
}

export class LCRListData {
    status: string;
    countries_count: number;
    direct: number;
    premium: number;
    wholesale: number;
    mixed: number; /** ID-173 */
    nonlcr: number;
    countries: string[];
    gateways: GatewayList[];
}

export class GatewayList {
    country: string;
    mcc: number;
    direct: Gateway[];
    premium: Gateway[];
    wholesale: Gateway[];
    mixed: Gateway[]; /** ID-173 */
    nonlcr: Gateway[];
}
export class Gateway {
    id: number;
    gw_id: string;
    gw_name: string;
    status: number;
}

// Route Management Lease Cost Route //

// Route Management Lease Cost Route Update //
export class LCRStatusUpdate {
    loggedinusername: string;
    loggedinempid: number;
    list: LCRStatusUpdateList[];
}
export class LCRStatusUpdateList {
    mcc: number;
    gw_id: string;
    status: number;

    id: number;
    gw_name: string;
}
export class LCRStatusUpdateRes {
    responsecode: number;
    responsestatus: string;
    message: string;
}
// Route Management Lease Cost Route Update //