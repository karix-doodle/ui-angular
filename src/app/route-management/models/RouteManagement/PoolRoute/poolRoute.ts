// Route Management Poll Route List //
export class PoolRouteListRes {
    responsecode: number;
    responsestatus: string;
    data: PoolRouteListData;
    message?: string;
}

export class PoolRouteListData {
    routes_count: number;
    routes_list: RoutesRowlist[];
}

export class RoutesRowlist {
    route_id: number;
    route_name: string;
    countries_count: number;
    createdby: string;
    createduser: string;
    created_date: string;
    created_time: string;
    tagged_accounts_list: TaggedAccountsList[];
}

export class TaggedAccountsList {
    esmeaddr: number;
    tagged_by: string;
    tagged_date: string;
}
// Route Management Poll Route List //

// Route Management view pool route //
export class SelectedPoolRoute {
    route_id: number;
    loggedinempid: number;
}

export class SelectedPoolRouteRes {
    responsecode: number;
    responsestatus: string;
    data: SelectedPoolData;
    message?: string;
}

export class SelectedPoolData {
    id: number;
    route_name: string;
    gw_type: string;
    fallback_route: string;
    row_route: string;
    created_by: string;
    cts: string;
    comments: string;
    countries_count: number;
    continents_count: number;
    routes_list: RoutesList[];
    row_routes_list: RowRoutesList[];
    tagged_accounts_count: number;
    tagged_accounts_list: TaggedAccountsList[];
}

export class RoutesList { }
export class RowRoutesList { }

// Route Management view pool route //
// Route Management Delete Pool Route //
export class PoolRouteRes {
    responsecode: number;
    responsestatus: string;
    message: string;
}
// Route Management Delete Pool Route //

// Route Management create a Pool Route //
export class CreateAPoolRouteBody {
    // POOL EDIT
    route_id: string;
    page_name: string;
    route_name: string;
    gw_type: string;
    fallback_gw_type: string;
    routes_list: NewRoutesList[];
    row_route: string;
    row_routes_list: NewRowRoutesList[];
    loggedinempid: string;
    comments: string;
}
export class NewRoutesList {
    continent: string;
    country: string;
    mcc: number;
    operator: string;
    mnc: number;
    ratios: NewRowRoutesList[];
}
export class NewRowRoutesList {
    gw_id: string;
    gw_name?: string;
    ratio_in_percentage: number;
    currency_id?: number;
}
// Route Management create a Pool Route //

// Clone a specific pool route//
export class CloneAPoolRouteBody {
    route_id: number;
    loggedinempid: number;
}

export class CloneAPoolRouteRes {
    responsecode: number;
    responsestatus: string;
    data: CloneAPoolRouteData;
    message?: string;
}

export class CloneAPoolRouteData {
    route_name: string;
    gw_type: string;
    fallback_route: string;
    row_route: string;
    created_by: string;
    cts: string;
    comments: string;
    countries_count: number;
    continents_count: number;
    routes_list: NewRoutesList[];
    row_routes_list: NewRowRoutesList[];
    cloneid: number;
}

// Clone a specific route//
