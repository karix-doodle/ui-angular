/**
 * @module customer-management
 * @description Custmor listing START
*/
import { Time } from '@angular/common';

/**
 * @module customer-management
 * @description Customers pending for activation listing START
*/
export class PendingUsers_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: PendingUsers;
    message: string;
};

export class PendingEsmeList {
    esmeaddr: number;
    username: string;
    orgname: string;
    submissiondateandtime: string;
    salespersonname: string;
    intl_routetype: string;
};

export class PendingUsers {
    totalpendingesmes: number;
    pendingesmelists: PendingEsmeList[];
}

export class APIResponse{
    responsecode: number;
    responsestatus: string;
    data: PendingUsers;
    message: string;
}

export class ExistingUserData{
    totalexistingesmes: number;
    existing_esme_lists: ExistingUsers[];
}

export class ExistingUsers{
    esmeaddr: number;
    username: string;
    orgname: string;
    billingtype: string;
    salespersonname: string;
    ratecardtype: string;
    ratecardname: string;
    ratecardid: string;
    intlaccttype: string;
    routingtype: string;
}


/** 
  ************************* @description Customers pending for activation listing END
*/

/**
 * @module customer-management
 * @description Activate customer pending for activation START
*/

export class UserActivation_ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: UserRoutingConfig;
    message: string;
};

export class UserRoutingConfig {
    esmeaddr: number;
    username: string;
    msg_type: number;
    company_name: string;
    billing_type: string;
    intl_routetype: string;
    billing_currency: string;
    billplan_id: number;
    billplan_name: string;
    routetype: string;
    lcr_route: string;
    gwid_primary: string;
    gwid_fallback: string;
    pool_route_id: string;
    pool_route_name: string;
    process_row: number;
    process_at_loss: number;
    max_loss_per_sms: number;
    is_permanent: number;
    effective_till: string;
    timezone: string;
    timezone_offset: string;
    charsetEncoding: string;
    dlrType: string;
    lcrOnly: number;
    comments: string;
    notifysales: number;
    notifyclient: number;
};

export class TimeZones {
    id: number;
    offset: string;
    country_name: string;
    timezone: string;
};

export class TimeZonesApiResponse {
    responsecode: number;
    responsestatus: string;
    data: TimeZones[];
    message: string;
};


export class Gateway {
    gw_id: string;
    gw_name: string;
};

export class Pool {
    id: string;
    route_name: string;
};

export class ApiResponse_Generic{
    responsecode: number;
    responsestatus: string;
    message: string;
}



