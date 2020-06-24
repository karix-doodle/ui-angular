export class RateCardSearchSuggestionParams {
    loggedinusername: string;
    loggedinempid: number;
    ratecardtype: string;
    ratecardname: string;
}

export class RateCardSearchRes {
    responsecode: number;
    responsestatus: string;
    data: RateCardList[];
    message?: string;
}

export class RateCardList {
    ratecard_id: number;
    ratecard_name: string;
}


// -----------------------delete ratecard form billplan--------------
export class DeleteRatecardRes {
    responsecode: number;
    responsestatus: string;
    message: string;
}
// -----------------------delete ratecard form billplan--------------


export class BillPlanDetailsView_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: BillPlanDetailsView_Data;
    message?: string;
}
export class BillPlanDetailsView_Data {
    data: BillPlanDetailsView_Data;
    billplanid: number;
    billplanname: string;
    ratecardtype: string;
    billingtype: string;
    createdby: string;
    date: Date;
    time: string;
    isratecardtypeenabled: boolean
    tabledata: BillPlanDetailsView_TableDataList[]
}
export class BillPlanDetailsView_TableDataList {
    billplanid: number;
    ratecardid: number;
    ratecardname: string;
    ratecardtype: string;
    uploadby: string;
    uploaduser: string;
    uploaddate: Date;
    uploadtime: string;
    fromeffectivedate: Date;
    toeffectivedate: string
}


export class AssigendRateCard_ApiResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}