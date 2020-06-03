/**
 * @description model for custom route Summary API
 */
export class CustomSummary_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: CustomSummary_Data;
}

/**
 * @description model for custom route gateway API
 */
export class CustomGateway_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: CustomGateway_Data;
}

export class CustomGateway_Data {
  gw_id: string;
  gw_name: string;
}

/**
 * @description model for custom route Summary Data
 */
export class CustomSummary_Data {
  unique_mobile_routes_count: number;
  unique_mobile_senderid_mobile_count: number;
  unique_mobile_senderid_senderid_count: number;
  unique_country_count: number;
  unique_operator_count: number;
}

/**
 * @description model for mobile custom route API
 */
export class MobileCustom_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: MobileCustom_List;
}

/**
 * @description model for mobile custom route data
 */
export class MobileCustom_List {
  total: number;
  unique_mobile_count: number;
  mobile_list: MobileList_Data[];
}

/**
 * @description model for mobile custom route list data
 */
export class MobileList_Data {
  id: number;
  whitelist_type: string;
  mobile: number;
  fallback_route: CustomGateway_Data;
  primary_route: CustomGateway_Data;
  comments: string;
  createdby: string;
  cts: Date;
}


export class MobileCustomSenderId_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: MobileCustomSender_Data;
}

export class MobileCustomSender_Data {
  status: string;
    total: number;
    unique_mobile_count: number;
    unique_senderid_count: number;
    mobile_senderid_list: MobileSenderList_Data[];
}

export class MobileSenderList_Data {
  id: number;
  mobile: number;
  senderid: string;
  whitelist_type: string;
  primary_route: {
    gw_id: string;
    gw_name: string;
  };
  fallback_route: {
    gw_id: string;
    gw_name: string;
  };
  cts: Date;
  createdby: string;
  comments: string;
}

export class MobileCustomResponse {
  responsecode: number;
  responsestatus: string;
  message: string;
}

export class MobileCustomSenderIdResponse {
    responsecode: number;
    responsestatus: string;
    message: string;
}
