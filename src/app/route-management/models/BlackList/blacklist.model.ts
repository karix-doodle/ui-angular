export class BlackListSummary_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: BlackListSummary_Data;
}

export class BlackListSummary_Data {
  unique_blacklist_mobile_count: number;
  unique_blacklist_senderid_count: number;
  unique_blacklist_template_count: number;
  unique_blacklist_mobilesenderid_mobile_count: number;
  unique_blacklist_mobilesenderid_senderid_count: number;
}

export class BlackListGateway_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: BlackListGateway_Data;
}

export class BlackListGateway_Data {
  gw_id: string;
  gw_name: string;
}

export class MobileBlackList_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: MobileBlack_List;
}

export class MobileBlack_List {
  total: number;
  unique_mobile_count: number;
  mobile_list: MobileList_Data[];
}

export class MobileList_Data {
  id: number;
  blacklist_type: string;
  mobile: number;
  time: string;
  createdby: string;
  date: Date;
  comments: '';
}

export class MobileBlackList_AddResponse {

    responsecode: number;
    responsestatus: string;
    message: string;
    data: MobileBlackList_AddData;
}

export class MobileBlackList_AddData{
  success: number;
  duplicate: number;
  failed: number;
  invalid: number;
  total: number;
  invalidData:InvalidData;
}

export class InvalidData{
  index:number;
  row: any;
  reason:string
}

export class MobileBlackList_DeleteResponse{
  responsecode: number;
  responsestatus: string;
  message: string;
}


export class MobileSenderidBlackList_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: MobileSenderidBlack_List;
}

export class MobileSenderidBlack_List {
  total: number;
  unique_mobile_count: number;
  unique_senderid_count: number;
  mobile_senderid_list: MobileSenderidList_Data[];
}

export class MobileSenderidList_Data {
  id: number;
  blacklist_type: string;
  // fallback_route: SenderGateway_Data;
  // primary_route: SenderGateway_Data;
  mobile: number;
  senderid: string;
  cts: string;
  createdby: string;
  comments: '';
}
export class SenderGateway_Data {
  gw_id: string;
  gw_name: string;
}

export class MobileSenderidBlackList_AddResponse {

  responsecode: number;
  responsestatus: string;
  message: string;
  data: MobileSenderidBlackList_AddData;
}

export class MobileSenderidBlackList_AddData{
  success: number;
  duplicate: number;
  failed: number;
  invalid: number;
  total: number;
}

export class MobileSenderidBlackList_DeleteResponse{
  responsecode: number;
  responsestatus: string;
  message: string;
}


export class MobileSenderidCotentBlackList_ApiResponse {
  responsecode: number;
  responsestatus: string;
  data: MobileSenderidBlack_List;
}

export class MobileSenderidContentBlack_List {
  total: number;
  unique_senderid_count: number;
  unique_template_count: number;
  senderid_template_list: MobileSenderidContentList_Data[];
}

export class MobileSenderidContentList_Data {
  id: number;
  blacklist_type: string;
  senderid: string;
  template: string;
  cts: string;
  createdby: string;
  comments: '';
}

export class MobileSenderidContentBlackList_AddResponse {

  responsecode: number;
  responsestatus: string;
  message: string;
  data: MobileSenderidBlackList_AddData;
}

export class MobileSenderidContentBlackList_AddData{
  success: number;
  duplicate: number;
  failed: number;
  invalid: number;
  total: number;
}

export class MobileSenderidContentBlackList_DeleteResponse{
  status: string;
  response: {
    responsecode: number;
    responsestatus: string;
    message: string;
  };

}




