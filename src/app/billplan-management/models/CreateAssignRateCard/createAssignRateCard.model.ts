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
export class DeteletRatecardBody {
    loggedinusername: string;
    loggedinempid: number;
    billplanid: number;
    ratecardid: number;
}
export class DeleteRatecardRes {
    responsecode: number;
    responsestatus: string;
    messgae: string;
}
// -----------------------delete ratecard form billplan--------------

