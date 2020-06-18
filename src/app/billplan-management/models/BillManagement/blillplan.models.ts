export class BlillPlanSumary_ApiResponse{
  responsecode: number;
  responsestatus: string;
  data: BillPlanSummary_Data
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


export class BillPlanTableList_ApiResponse{

    responsecode: number;
    responsestatus: string;
    data:{
      totalbillplan: number;
      tabledata: BillPlanTableList_Data[];
    }



}

export class BillPlanTableList_Data {
  id: number;
  billplanname: string;
  ratecardname:string;
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
  currency_id: number;
  currency_name: string;
  currency_symbol: string;
}