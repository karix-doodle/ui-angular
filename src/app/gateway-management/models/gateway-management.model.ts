/**
 * @module gateway-management
 * @description Gateway listing START
*/
import { Time } from '@angular/common';

export class GtListing_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtListing_Data;
    message: string;
}
export class GtListing_Data {
    total: number;
    direct: number;
    premium: number;
    wholesale: number;
    tabledata: GtListing_TableDataList[];
    data: GtListing_Data;
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
 ************************* @description Gateway listing END
*/

/**
 * @module gateway-management
 * @description Gateway Status Update START
*/
export class GtStatusupdate_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
/**
 ************************* @description Gateway Status Update END
*/

/**
 * @module gateway-management
 * @description Gateway Details START
*/
export class GtDetails_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtDetails_Data;
    message: string;
}
export class GtDetails_Data {
    gw_id: string;
    gw_name: string;
    status: number;
    currency_symbol: string;
    currency: string;
    currency_id: number;
    timezone: string;
    gw_type: string;
    billing_type: string;
    msg_type: string;
    exclude_lcr: number;
    tps: string;
    dlr_type: string;
    charset_enc: string;
    senderid_whitelist_required: number;
    senderid_type: number;
    is_bill_on_submission: boolean;
    description: boolean;
    createdby: number;
    modifiedby: number;
    cdate: Date;
    ctime: Time;
    mdate: Date;
    mtime: Time;
    pdate: Date;
    ptime: Time;
    mobileblocklist: number;
    inactivedestination: number;
    activedestination: number;
    totaldestination: number;
    alphabeticsenderid: number;
    numericsenderid: number;
    senderidcount: number;
    senderidcontent: number;
    noofesmeaddrs: number;
    addcountrypercurrentmonth: number;
    inactivecountrypercurrentmonth: number;
    noofcountrypricechanged: number;
    currentmonthcount: number;
    top5traffic: object;
    top5profitable: object;
    least5profitable: object
}
/**
 ************************* @description Gateway Details END
*/

/**
 * @module gateway-management
 * @description Gateway Details CountryList START
*/
export class GtDetailsCountryList_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtDetailsCountryList_Data;
    message: string;
}
export class GtDetailsCountryList_Data {
    gw_id: string;
    gw_name: string;
    totalcountry: number;
    totaloperator: number;
    tabledata: GtDetailsCountryList_TableDataList[]
}
export class GtDetailsCountryList_TableDataList {
    id: number;
    gw_id: string;
    country: string;
    operator: string;
    mcc: number;
    mnc: number;
    current_rate: number;
    status: number;
    default_senderid: null;
    senderid_type: null;
    ratehistory: []
}
/**
 ************************* @description Gateway Details CountryList END
*/

/**
 * @module gateway-management
 * @description Gateway Sender WhiteList START
*/
export class GtSenderIdWhiteList_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtSenderIdWhiteList_Data;
    message: string;
}
export class GtSenderIdWhiteList_Data {
    gw_id: string;
    gw_name: string;
    totalcountry: number;
    totaloperator: number;
    tabledata: GtSenderIdWhiteList_TableDataList[]
}
export class GtSenderIdWhiteList_TableDataList {
    id: number;
    gw_id: string;
    country: string;
    senderid: string;
    createdby: number;
    date: Date;
    time: Time;
}
/**
 ************************* @description Gateway Sender WhiteList END
*/

/**
 * @module gateway-management
 * @description Gateway Details View Log START
*/
export class GtDetailsViewLog_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtDetailsViewLog_Data;
    message: string;
}
export class GtDetailsViewLog_Data {
    gw_id: string;
    gw_name: string;
    totalcountry: number;
    totaloperator: number;
    tabledata: GtDetailsViewLog_TableDataList[]
}
export class GtDetailsViewLog_TableDataList {
}
/**
 ************************* @description Gateway Details View Log END
*/

/**
 * @module gateway-management
 * @description Gateway TimeZone START
*/
export class GtTimeZone_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtTimeZone_Data;
    message: string;
}
export class GtTimeZone_Data {
    id: number;
    offset: string;
    country_name: string;
    timezone: string;
}
/**
 ************************* @description Gateway TimeZone END
*/

/**
 * @module gateway-management
 * @description Gateway Currency START
*/
export class GtCurrency_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtCurrency_Data;
    message: string;
}
export class GtCurrency_Data {
    currency_id: number;
    currency_name: string;
    currency_symbol: string;
}
/**
 ************************* @description Gateway Currency END
*/