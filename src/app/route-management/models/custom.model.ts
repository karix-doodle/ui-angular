/**
 * @description model for custom route Summary API
 */
export class CustomSummary {
    responsecode: number;
    responsestatus: string;
    data: CustomSummaryData;
}

/**
 * @description model for custom route Summary Data
 */
export class CustomSummaryData {
    unique_mobile_routes_count: number;
    unique_mobile_senderid_mobile_count: number;
    unique_mobile_senderid_senderid_count: number;
    unique_country_count: number;
    unique_operator_count: number;
}

/**
 * @description model for mobile custom route API
 */
export class MobileCustom {
    responsecode: number;
    responsestatus: string;
    data: MobileCustomList;
}

/**
 * @description model for mobile custom route data
 */
export class MobileCustomList {
    mobile_list: MobileListData[];
}

/**
 * @description model for mobile custom route list data
 */
export class MobileListData {
    id: number;
    whitelist_type: string;
    mobile: number;
    fallback_route: {
        gw_id: string;
        gw_name: string;
    }
    primary_route: {
        gw_id: string;
        gw_name: string;
    }
    comments: string;
    createdby: string;
    cts: Date;
}