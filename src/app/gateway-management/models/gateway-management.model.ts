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
 * @description Gateway create START
*/
export class GtCreate_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
/**
 ************************* @description Gateway listing END
*/


/**
 * @module gateway-management
 * @description Gateway Edit START
*/
export class GtEdit_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtEdit_Data;
    message: string;
}
export class GtEdit_Data {
    gw_id: string;
    gw_name: string;
    status: number;
    is_bill_on_submission: boolean;
    currency_id: number;
    timezone: number;
    gw_type: string;
    billing_type: string;
    msg_type: any;
    exclude_lcr: string;
    tps: number;
    dlr_type: string;
    charset_enc: string;
    senderid_whitelist_required: string;
    senderid_type: number;
    price_update_ts: string;
    description: string;
    createdby: number;
    modifiedby: number;
    cdate: Date;
    ctime: Time;
    mdate: Date;
    mtime: Time
}
/**
 ************************* @description Gateway Edit END
*/

/**
 * @module gateway-management
 * @description Gateway Update START
*/
export class GtUpdate_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
/**
 ************************* @description Gateway Status Update END
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
    timezone: number;
    gw_type: string;
    billing_type: string;
    msg_type: any;
    exclude_lcr: string;
    tps: string;
    dlr_type: string;
    charset_enc: string;
    senderid_whitelist_required: string;
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
 * @description Gateway Details added country list START
*/
export class GtAddedCountryList_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtAddedCountryList_Data;
    message: string;
}
export class GtAddedCountryList_Data {
    gw_id: string;
    gw_name: string;
    total: string;
    data: any
}
/**
 ************************* @description Gateway Details Active country list END
*/

/**
 * @module gateway-management
 * @description Gateway Details inActive country list START
*/
export class GtInactiveCountryList_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtInactiveCountryList_Data;
    message: string;
}
export class GtInactiveCountryList_Data {
    gw_id: string;
    gw_name: string;
    total: string;
    data: any
}
/**
 ************************* @description Gateway inDetails Active country list END
*/

/**
 * @module gateway-management
 * @description Gateway Details price change country list START
*/
export class GtPriceChangeCountryList_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtPriceChangeCountryList_Data;
    message: string;
}
export class GtPriceChangeCountryList_Data {
    gw_id: string;
    gw_name: string;
    total: string;
    data: any
}
/**
 ************************* @description Gateway inDetails Active country list END
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
export class GtSenderIdWhiteListDelete_ApiResponse {
    responsecode: number;
    responsestatus: string;
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
    id: number;
    gw_id: string;
    actionby: string;
    activity: string;
    comment: string;
    date: Date;
    time: Time;
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

/**
 * @module gateway-management
 * @description Gateway Country Status Update START
*/
export class GtCountryStatusupdate_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
/**
 ************************* @description Gateway Country Status Update END
*/

/**
 * @module gateway-management
 * @description Gateway File audit log START
*/
export class GtFileAuditLog_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtFileAuditLog_Data;
    message: string;
}
export class GtFileAuditLog_Data {
    gw_id: string;
    gw_name: string;
    totalcountry: number;
    totaloperator: number;
    tabledata: GtFileAuditLog_TableDataList[]
}
export class GtFileAuditLog_TableDataList {
    id: number;
    gw_id: string;
    uuid: string;
    contry: string;
    operator: string;
    mcc: number;
    mnc: number;
    currentrate: string;
    fromEffectDate: Date;
    oldrate: number;
    changetype: string;
    toEffectDate: Date
}
/**
 ************************* @description Gateway File audit log END
*/

/**
 * @module gateway-management
 * @description Gateway File audit file log START
*/
export class GtFileAuditFileLog_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtFileAuditLog_Data;
    message: string;
}
export class GtFileAuditFileLog_Data {
    gw_id: string;
    gw_name: string;
    totalcountry: number;
    totaloperator: number;
    tabledata: GtFileAuditFileLog_TableDataList[]
}
export class GtFileAuditFileLog_TableDataList {
    id: number;
    gw_id: string;
    uuid: string;
    contry: string;
    operator: string;
    mcc: number;
    mnc: number;
    currentrate: string;
    fromEffectDate: Date;
    oldrate: number;
    changetype: string;
    toEffectDate: Date
}
/**
 ************************* @description Gateway File audit file log END
*/