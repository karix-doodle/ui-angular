export class SlabCreateRateCardBody {
    loggedinusername: string;
    loggedinempid: number;
    billplan_id: number;
    billplan_currencyid: number;
    ratecard_type: string;
    ratecard_name: string;
    countries: Countries[];
    ratetype_row: string;
    row_custom: Slabs[];
    discount_rate: number | string;
    discount_type: string;
    description: string;
}
export class Countries {
    continent_name: string;
    country_name: string;
    operator_name: string;
    mcc: number;
    mnc: number;
    slabs: Slabs[];
}
export class Slabs {
    min: number;
    max: number;
    billing_rate: number;
    normalize_rate: number;
}
export class SlabCreateRateCardRes {
    responsecode: number;
    responsestatus: string;
    message: string;
}

