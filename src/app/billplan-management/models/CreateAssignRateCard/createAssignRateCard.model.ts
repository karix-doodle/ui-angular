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
