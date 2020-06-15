/**
 * @module customer-management
 * @description Custmor listing START
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
    routetype: string;
}

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
    intlaccttype: string;
}