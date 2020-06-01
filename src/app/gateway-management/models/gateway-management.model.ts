/**
 * @module gateway-management
 * @description gt-listing START
*/

export class GtListing_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtListing_ListData;
    message: string;
}
export class GtListing_ListData {
    total: number;
    direct: number;
    premium: number;
    wholesale: number;
    tabledata: GtListing_TableDataList[];
    data: GtListing_ListData;
}
export class GtListing_TableDataList {
    id: number;
    gw_id: string;
    gw_name: string;
    status: number;
    gw_type: string;
    lastdate: string;
    lasttime: string;
    pricedate: string;
    pricetime: string;
}
/**
 * @description gt-listing END
*/