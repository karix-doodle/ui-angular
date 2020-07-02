/**
 * @module customer-management
 * @description Custmor listing START
 */
import { Time } from "@angular/common";

/**
 * @module customer-management
 * @description Customers pending for activation listing START
 */
export class PendingUsers_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: PendingUsers;
  message: string;
}

export class PendingEsmeList {
  esmeaddr: number;
  username: string;
  orgname: string;
  submissiondateandtime: string;
  salespersonname: string;
  intl_routetype: string;
}

export class PendingUsers {
  totalpendingesmes: number;
  pendingesmelists: PendingEsmeList[];
}

export class APIResponse {
  responsecode: number;
  responsestatus: string;
  data: PendingUsers;
  message: string;
}

export class ExistingUserData {
  totalexistingesmes: number;
  existing_esme_lists: ExistingUsers[];
}

export class ExistingUsers {
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
}

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
  ratecard_id: number;
  ratecard_name: string;
  ratecard_type: string;
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
}

export class TimeZones {
  id: number;
  offset: string;
  country_name: string;
  timezone: string;
}

export class TimeZonesApiResponse {
  responsecode: number;
  responsestatus: string;
  data: TimeZones[];
  message: string;
}

export class Gateway {
  gw_id: string;
  gw_name: string;
}

export class Pool {
  id: string;
  route_name: string;
}

export class ApiResponse_Generic {
  responsecode: number;
  responsestatus: string;
  message: string;
  data: any;
}

export class EsmeaddrApi_Response {
  responsecode: number;
  responsestatus: string;
  data: {
    esmeaddr: number;
    clientname: string;
    customertype: string;
    billingcontactname: string;
    salesmanagername: string;
    messagetype: string;
    billingtype: string;
    smppbindallowed: string;
    noofbindsallowed: number;
    charsetencoding: string;
    dlrtype: string;
    dlrconfiguration: string;
    validation: {
      senderidtype: string;
      defaultsenderid: string;
      templatefailedsenderid: string;
      blocksmstoindia: string;
    };
    routing: {
      routingtype: string;
      routingname: string;
      countriesallowed: string;
      countriesblockedplatform: number;
      rowallowed: string;
    };
    billinginfo: {
      billplanname: string;
      ratecardtype: string;
      billingcurrency: string;
      applicabletaxation: string;
      billplanchangenotificationtoclient: number;
    };
    settings: {
      processrow: number;
      processloss: number;
      lossthreshold: string;
      billingtimezone: string;
      failurenotificationtosalesandinternationalteam: number;
    };
    accountactivities: {
      creationdatetime: string;
      lastmodificationdatetime: string;
      lastmodifieduser: string;
      ratecardAssigndatetime: string;
      billplanlastmodificationdatetime: string;
      billplanmodifiedby: number;
    };
  };
}

export class EssmeddrRateCardList_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: {
    tabledata: EssmmdrTabledata[];
  };
}

export class PoolRouteSearchRes {
  responsecode: number;
  responsestatus: string;
  data: Pool[];
  message?: string;
}

export class EssmmdrTabledata {
  ratecardname: string;
  effectivefrom: string;
  effectiveto: string;
}

export class viewLogApi_Response {
  responsecode: number;
  responsestatus: string;
  data: {
    clientname: string;
    esmeaddr: string;
    tabledata: viewLogTableData[];
  };
}

export class viewLogTableData {
  activity: string;
  comments: string;
  date: string;
  time: string;
  user: string;
}

export class AllowedCountryOperatorList {
  responsecode: number;
  responsestatus: string;
  data: {
    esmeaddr: string;
    active: number;
    inactive: number;
    list: AllowedCountryOperTable[];
  };
}

export class AllowedCountryOperTable {
  country: string;
  mcc: number;
  operator: string;
  mnc: number;
  status: string;
  senderid_type: string;
  default_senderid: string;
  alternate_senderid: string;
}

export class AllowedCountryApi_Response {
  responsecode: number;
  responsestatus: string;
  data: AllowedCountry_Data[];
}

export class AllowedCountry_Data {
  country: string;
  mcc: number;
}

export class AllowedOperatorApi_Response {
  responsecode: number;
  responsestatus: string;
  data: AllowedOperator_Data[];
}

export class AllowedOperator_Data {
  operator: string;
  mnc: number;
}

export class AddSenderIdApi_Response {
  responsecode: number;
  responsestatus: string;
  message: string;
}

export class GetSenderisApi_Response {
  responsecode: number;
  responsestatus: string;
  data: {
    hasdata: boolean;
    senderids: {
      senderid_type: string;
      default_senderid: string;
      alternate_senderid: string;
    };
  };
}

export class SenderIdsApi_Response {
  responsecode: number;
  responsestatus: string;
  data: {
    total: number,
    senderidlists: SenderIdLists[];
  };
}

export class SenderIdLists {
  senderid: string;
}

export class BlockedSenderIdsApi_Response {
  responsecode: number;
  responsestatus: string;
  data: {
    total: number,
    blockedsenderidlists: BlockedSenderIdLists[];
  };
}

export class BlockedSenderIdLists {
  senderid: string;
}

export class BillOnSubmissionCountryListApi_Response {
  responsecode: number;
  responsestatus: string;
  data: BillOnSubmissionCountryList_Data[];
}
export class BillOnSubmissionCountryList_Data {
  country: string;
  mcc: number;
  billOnSub: string;
}


export class AssignedServiceApi_Response{

    responsecode: number
    responsestatus: string
    data: {
      channel: string[],
      mediaandservicelists: {
        sms:[],
        voice:[]
      }
    }

}

export class BlacklistTemplateApi_Response{
    responsecode: number
    responsestatus: string
    data: {
      total: number,
      whitelistedtemplatelists: whitelistedtemplatelists[]

}
}

export class whitelistedtemplatelists{
  pattern: string
}

export class BlockedTemplateListApi_Response{

    responsecode: number
    responsestatus: string
    data: {
      total: number
      blockedtemplatelists: BlockedTemplateList[]

  }
}

export class BlockedTemplateList{
  template: string
}

