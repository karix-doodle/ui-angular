export class ApiResponse {
    responsecode: number;
    responsestatus: string;
    data: ListData;
}

export class ListData {
    total: number;
    direct: number;
    premium: number;
    wholesale: number;
    tabledata: TableDataList[];
    data: ListData;
}

export class TableDataList {
    id: number;
    gw_id: string;
    gw_name: string;
    status: number;
    gw_type: string;
    lastdate: string;
    lasttime: string;
    pricedate: string;
    pricetime: string;
}