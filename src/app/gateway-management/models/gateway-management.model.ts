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
 * @description Gateway Senderid WhiteList START
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
 ************************* @description Gateway Senderid WhiteList END
*/

/**
 * @module gateway-management
 * @description Gateway Senderid add START
*/
export class GtAddSenderId_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
/**
 ************************* @description Gateway Senderid add END
*/

/**
 * @module gateway-management
 * @description Gateway Senderid delete START
*/
export class GtSenderIdWhiteListDelete_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
/**
 ************************* @description Gateway Senderid delete END
*/

/**
 * @module gateway-management
 * @description Gateway Senderid country List START
*/
export class GtSenderIdCountryList_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtSenderIdCountryList_Data;
    message: string;
}
export class GtSenderIdCountryList_Data {

}
/**
 ************************* @description Gateway Senderid country List END
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
 * @description Gateway Sender id config country list START
*/
export class GtSenderIdConfigCountryList_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
    data: GtSenderIdConfigCountryList_Data;
}
export class GtSenderIdConfigCountryList_Data {
    country: string;
    mcc: number;
}
/**
 ************************* @description Gateway Sender id config country list END
*/

/**
 * @module gateway-management
 * @description Gateway Sender id config operator list START
*/
export class GtSenderIdConfigOperatorList_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
    data: GtSenderIdConfigCountryList_Data;
}
export class GtSenderIdConfigOperatorList_Data {
    country: string;
    mcc: number;
}
/**
 ************************* @description Gateway Sender id config operator list END
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
    data: GtFileAuditFileLog_Data;
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

/**
 * @module gateway-management
 * @description Gateway File audit file country START
*/
export class GtFileAuditFileCountry_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtFileAuditFileCountry_Data;
    message: string;
}
export class GtFileAuditFileCountry_Data {
    country: string;
    mcc: string;
}
/**
 ************************* @description Gateway File audit file country END
*/

/**
 * @module gateway-management
 * @description Gateway File audit file operator START
*/
export class GtFileAuditFileOperator_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtFileAuditFileOperator_Data;
    message: string;
}
export class GtFileAuditFileOperator_Data {
    country: string;
    mcc: string;
}
/**
 ************************* @description Gateway File audit file operator END
*/

/**
 * @module gateway-management
 * @description Gateway Country list view log START
*/
export class GtCountryListViewLog_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtCountryListViewLog_Data;
    message: string;
}
export class GtCountryListViewLog_Data {
    gw_id: string;
    gw_name: string;
    country: string;
    operator: string;
    tabledata: GtCountryListViewLog_TableDataList
}
export class GtCountryListViewLog_TableDataList {
    rate: string;
    actionby: string;
    date: Date;
    time: Time;
}
/**
 ************************* @description Gateway Country list view log END
*/

/**
 * @module gateway-management
 * @description Gateway ESMEAddr routed List START
*/
export class GtESMEAddrRouted_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtESMEAddrRouted_Data;
    message: string;
}
export class GtESMEAddrRouted_Data {
    gw_id: string;
    gw_name: string;
    total: string;
    data: any;
}
/**
 ************************* @description Gateway ESMEAddr routed List END
*/

/**
 * @module gateway-management
 * @description Gateway ESMEAddr routed List START
*/
export class GtSenderidContentList_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GtSenderidContentList_Data;
    message: string;
}
export class GtSenderidContentList_Data {
    total: number;
    unique_senderid_count: number;
    unique_template_count: number;
    senderid_template_list: GtSenderidContentList_TableDataList;
}
export class GtSenderidContentList_TableDataList {
    id: number;
    senderid: string;
    template: string;
    blacklist_type: string;
    cts: string;
    createdby: string;
    comments: null;
}
/**
 ************************* @description Gateway ESMEAddr routed List END
*/