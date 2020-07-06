// --
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
// --
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
// --
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
// --
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