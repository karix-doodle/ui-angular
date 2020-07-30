/**
 * @module settings
 * @description Settings TimeZone START
*/
export class SettingsTimeZone_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: SettingsTimeZone_Data;
    message: string;
}
export class SettingsTimeZone_Data {
    data: SettingsTimeZone_Data;
    id: number;
    offset: string;
    country_name: string;
    timezone: string;
}
/**
 ************************* @description Settings TimeZone END
*/

/**
 * @module settings
 * @description Settings Currency START
*/
export class SettingsCurrency_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: SettingsCurrency_Data[];
    message: string;
}
export class SettingsCurrency_Data {
    data: SettingsCurrency_Data;
    currency_id: number;
    currency_name: string;
    currency_symbol: string;
}
/**
 ************************* @description Settings Currency END
*/

/**
 * @module settings
 * @description Settings DefaultCountryOperator START
*/
export class GsDefaultCountryOperator_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GsDefaultCountryOperator_Data[];
    message: string;
}
export class GsDefaultCountryOperator_Data {
    data: GsDefaultCountryOperator_Data;
    totalcountry: number;
    totaloperator: number;
    tabledata: GsDefaultCountryOperator_TableDataList[]
}
export class GsDefaultCountryOperator_TableDataList {
    id: number;
    continent: string;
    country: string;
    operator: string;
    mcc: number;
    mnc: number;
    billing_currency: string;
    billing_currency_name: string;
    billing_rate: string;
    normalizerate: string;
}
/**
 ************************* @description Settings DefaultCountryOperator END
*/

/**
 * @module settings
 * @description Settings DefaultCountry START
*/
export class GsDefaultCountry_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GsDefaultCountry_Data[];
    message: string;
}
export class GsDefaultCountry_Data {
    data: GsDefaultCountry_Data;
    totalcountry: number;
    tabledata: GsDefaultCountry_TableDataList[]
}
export class GsDefaultCountry_TableDataList {
    id: number;
    continent: string;
    country: string;
    mcc: number;
    billing_currency: string;
    billing_currency_name: string;
    billing_rate: string;
    normalizerate: string;
}
/**
 ************************* @description Settings DefaultCountry END
*/

/**
 * @module settings
 * @description Settings GlobalCountryOperator START
*/
export class GsGlobalCountryOperator_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GsGlobalCountryOperator_Data[];
    message: string;
}
export class GsGlobalCountryOperator_Data {
    data: GsGlobalCountryOperator_Data;
    totalcountry: number;
    totaloperator: number;
    tabledata: GsGlobalCountryOperator_TableDataList[]
}
export class GsGlobalCountryOperator_TableDataList {
    id: number;
    continent: string;
    country: string;
    operator: string;
    mcc: number;
    mnc: number;
    senderid_type: number;
    default_senderid: string;
    senderid_length: number;
    min_dest_length: number;
    max_dest_length: number;
    status: number;
    series: string;
    balanceseries: string;
}
/**
 ************************* @description Settings GlobalCountryOperator END
*/

/**
 * @module settings
 * @description Settings CountryOperatorEdit START
*/
export class GsCountryOperatorEdit_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GsCountryOperatorEdit_Data[];
    message: string;
}
export class GsCountryOperatorEdit_Data {
    data: GsCountryOperatorEdit_Data;
    mobileseries: any;
    default_senderid: string;
    senderid_type: number;
}
/**
 ************************* @description Settings CountryOperatorEdit END
*/

/**
 * @module settings
 * @description Settings Users START
*/
export class SettingsUsers_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: SettingsUsers_Data[];
    message: string;
}
export class SettingsUsers_Data {
    data: SettingsUsers_Data;
    currency_id: number;
    timezone_id: number;
}
/**
 ************************* @description Settings Users END
*/

/**
 * @module settings
 * @description Settings Userupdate START
*/
export class GsUserupdate_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
/**
 ************************* @description Settings Userupdate END
*/

/**
 * @module settings
 * @description Settings CountryOperatorupdate START
*/
export class GsCountryOperatorupdate_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
/**
 ************************* @description Settings CountryOperatorupdate END
*/

/**
 * @module settings
 * @description Settings Invoiceconversion START
*/
export class GsInvoiceconversion_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GsInvoiceconversion_Data[];
    message: string;
}
export class GsInvoiceconversion_Data {
    data: GsInvoiceconversion_Data;
    mode: string;
    conversiondetails: GsInvoiceconversion_TableDataList[]
}
export class GsInvoiceconversion_TableDataList {
    fromcurrencyid: number;
    rate: number;
    status: string;
    tocurrencyid: number;
}
/**
 ************************* @description Settings Invoiceconversion END
*/

/**
 * @module settings
 * @description Settings ConversionView START
*/
export class GsConversionView_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GsConversionView_Data[];
    message: string;
}
export class GsConversionView_Data {
    data: GsConversionView_Data;
    tabledata: GsConversionView_TableDataList[]
}
export class GsConversionView_TableDataList {
    id: number;
    conversionrate: number;
    conversiontype: string;
    convertedbyuser: string;
    fromcurrency: string;
    tocurrency: string;
    conversiondate: string;
    conversiontime: string;
}
/**
 ************************* @description Settings ConversionView END
*/

/**
 * @module settings
 * @description Settings ConversionAdd START
*/
export class GsConversionAdd_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: GsConversionAdd_Data[];
    message: string;
}
export class GsConversionAdd_Data {
    data: GsInvoiceconversion_Data;
    mode: string;
}
/**
 ************************* @description Settings ConversionAdd END
*/