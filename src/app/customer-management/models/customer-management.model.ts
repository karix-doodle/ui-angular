/**
 * @module customer-management
 * @description Custmor listing START
*/
import { Time } from '@angular/common';

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