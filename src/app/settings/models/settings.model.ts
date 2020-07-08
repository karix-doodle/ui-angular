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

// --
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

// --
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

// --
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
// --
export class GsUserupdate_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
// --
export class GsCountryOperatorupdate_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}