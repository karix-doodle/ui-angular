export class BlillPlanSumary_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: BillPlanSummary_Data;
}

export class BillPlanSummary_Data {
  billplan_postpaid_count: number;
  billplan_prepaid_count: number;
  postpaid_group_count: number;
  postpaid_country_count: number;
  postpaid_flatfix_count: number;
  postpaid_countryoperator_count: number;
  postpaid_slab_count: number;
  prepaid_country_count: number;
  prepaid_flatfix_count: number;
  prepaid_countryoperator_count: number;
}

export class BillPlanTableList_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: {
    totalbillplan: number;
    tabledata: BillPlanTableList_Data[];
  };
}

export class BillPlanTableList_Data {
  id: number;
  billplanname: string;
  ratecardname: string;
  billingtype: string;
  billingcurrency: string;
  createby: string;
  date: string;
  time: string;
  noofesmetag: number;
}

export class BillPlanCurrency_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: BillPlanCurrency_Data[];
  message: string;
}

export class BillPlanCurrency_Data {
  data: BillPlanCurrency_Data[];
  currency_id: number;
  currency_name: string;
  currency_symbol: string;
}

export class CurrencySybmol {
  bCurrency: Currency;
  nCurrency: Currency;
}

export class Currency {
  symbol: string;
  id: number;
}

export class BillPlanContinent_ApiRespone {
  responsecode: number;
  responsestatus: string;
  data: any;
}

export class BillPlanCountries_ApiRespone {
  responsecode: number;
  responsestatus: string;
  data: BillPlanCountries_Data[];
  message?: string;
}

export class BillPlanCountries_Data {
  country: string;
  country_code: number;
  mcc: number;
  continent: string;
  isSelected?: boolean;
}

export class BillPlanOperator_ApiRespone {
  responsecode: number;
  responsestatus: string;
  data: BillPlanOperator_Data[];
  message?: string;
}

export class BillPlanOperator_Data {
  operator: string;
  mnc: number;
}

export class BillPlanCreateGroup_ApiResponse {
  responsecode: number;
  responsestatus: string;
  message: string;
  data: any;
}

export class BillPlanCreateCountry_ApiResponse {
  responsecode: number;
  responsestatus: string;
  message: string;
  data: any;
}

export class BillPlanCreateCountryOperator_ApiResponse {
  responsecode: number;
  responsestatus: string;
  message: string;
  data: any;
}
export class BillPlanCreateFlatFixed_ApiResponse {
  responsecode: number;
  responsestatus: string;
  message: string;
  data: any;
}

export class CreateBillPlan_ApiResponse {
  responsecode: number;
  responsestatus: string;
  message: string;
  data: CreateBillPlan_Data;
}

export class CreateBillPlan_Data {
  billplan_id: number;
  billplan_name: string;
}

export class GetNameCheck_ApiResponse {
  responsecode: number;
  responsestatus: string;
  message: string;
  data: any;
}

// ----------------------- currency rate --------------------
export class CurrencyRateBody {
  loggedinusername: string;
  loggedinempid: number;
  fromcurrencyid: number;
  tocurrencyid: number;
}
export class CurrencyRateRes {
  responsecode: number;
  responsestatus: string;
  data: CurrencyRateData;
  message?: string;
}
export class CurrencyRateData {
  conversion_rate: number;
}
// ----------------------- currency rate --------------------
export class RateCardCountryView_ApiRResponse {
  responsecode: number;
  responsestatus: string;
  data: {
    ratecardname: string;
    currency: string;
    row_billplan: string;
    billplan_id: number;
    totalcountry: number;
    billplan_name: string
    countryratecard: RatecardViewCountry_Data[];
    row: RatecardViewCountryRow_Data[];
    description: string;
  };
}
export class RatecardViewCountryRow_Data {
  billing_rate: string;
  normalizerate: string;
  discount_percentage: number;
  country?: string;
  mcc?: number;

}

export class RatecardViewCountry_Data {
  country: string;
  mcc: number;
  billing_rate: string;
  normalizerate: string;
}

export class RateCardCountryOperatorView_ApiRResponse {
  responsecode: number;
  responsestatus: string;
  data: {
    ratecardname: string;
    currency: string;
    row_billplan: string;
    billplan_id: number;
    billplan_name: string
    totalcountry: number;
    totaloperator: number;
    countryratecard: RatecardViewCountryOperator_Data[];
    row: RatecardViewCountryOperatorRow_Data[];
    description: string;
  };
}

export class RatecardViewCountryOperatorRow_Data {
  billing_rate: string;
  normalizerate: string;
  discount_percentage: number;
  country?: string;
  mcc?: number;
  operator?: string
  mnc?: number

}

export class RatecardViewCountryOperator_Data {
  country: string;
  mcc: number;
  operator: string
  mnc: number
  billing_rate: string;
  normalizerate: string;

}


export class RateCardGroupView_ApiRResponse {
  responsecode: number;
  responsestatus: string;
  data: {
    ratecardname: string;
    currency: string;
    roc_billplan: string;
    billplan_id: number;
    row_billplan: string;
    billplan_name: string
    totalcountry: number;
    totalgroup: number;
    countryratecard: RatecardViewGroup_Data[];
    row: RatecardViewGroupRow_Data[];
    roc: RatecardViewRocGroup_Data[];
    description: string;
  };
}

export class RatecardViewGroupRow_Data {
  billing_rate: string;
  normalizerate: string;
  discount_percentage?: number;
  country: string;
  mcc: number;
  operator: string
  mnc: number;
  continent?: string
}

export class RatecardViewGroup_Data {
  country: string;
  mcc: number;
  operator: string
  mnc: number
  billing_rate: string;
  normalizerate: string;
  group_name: string;


}

export class RatecardViewRocGroup_Data {
  country: string;
  mcc: number;
  operator: string
  mnc: number
  billing_rate: string;
  normalizerate: string;
  continent?: string
}


export class RateCardSlabView_ApiRResponse {
  responsecode: number;
  responsestatus: string;
  data: {
    ratecardname: string;
    billplan_name: string
    currency: string;
    billplan_id: number;
    row_billplan: string
    totalcountry: number;
    totaloperator: number;
    slabratecard: RatecardViewSlabCountry_Data[];
    row: RatecardViewSlabRow_Data[];
    description: string;
  };
}

export class RatecardViewSlabRow_Data {
  min: number
  max: number
  billing_rate: string;
  normalizerate: string;
  country?: string;
  mcc?: number;
  operator?: string
  mnc?: number
  discount_percentage: number;
}

export class RatecardViewSlabCountry_Data {
  country: string;
  mcc: number;
  operator: string
  mnc: number
  min: number
  max: number
  billing_rate: string;
  normalizerate: string;

}


export class RateCardViewFlatFixedApi_Response {

  responsecode: number
  responsestatus: string
  data: {
    billplan_id: number
    billplan_name: string,
    ratecardname: string,
    currency: string,
    ratecard_type: string,
    discount_type: string,
    billing_rate: string,
    normalizerate: number
    discount_percentage: number
    description: string
  }

}


