// Route Management Lease Cost Route //
export class LCRList {
    responsecode: number;
    responsestatus: string;
    data: LCRListData;
}

export class LCRListData {
    status: string;
    countries_count: number;
    direct: number;
    premium: number;
    wholesale: number;
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
    nonlcr: Gateway[];
}
export class Gateway {
    id: number;
    gw_id: string;
    gw_name: string;
    status: number;
}

// Route Management Lease Cost Route //