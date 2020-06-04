// Get Country List - Models //
export class CountriesListRes {
    responsecode: number;
    responsestatus: string;
    data: CountriesListData[];
}

export class CountriesListData {
    country: string;
    country_code: number;
    mcc: number;
    continent: string;
}
// Get Country List - Models //

// Get Operators List - Models //
export class OperatorsListBody {
    country_code: number;
}

export class OperatorsListRes {
    responsecode: number;
    responsestatus: string;
    data: OperatorsListData[];
}

export class OperatorsListData {
    operator: string;
    mnc: number;
}
// Get Operators List - Models //

// Get Gatways List - Models //
export class GatewaysListBody {
    gw_type: string;
    loggedinempid: number;
    loggedinusername: string;
}

export class GatewaysListRes {
    responsecode: number;
    responsestatus: string;
    data: GatewaysListData[];
}

export class GatewaysListData {
    gw_id: string;
    gw_name: string;
}

// Get Gatways List - Models //
