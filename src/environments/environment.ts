// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: 'http://115.114.108.242/api/intlmgmt',
  //serverUrl: 'http://10.20.59.222:8383/api/intlmgmt',
  FileUploadUrl: 'http://10.20.51.182:8484/api/intlmgmt',
  loggedinusername: 'testuser',
  loggedinempid: 1234,
  UTC: "+05:30",
  APIStatus: {
    success: {
      text: 'success',
      code: 0
    },
    error: {
      text: 'failure',
      code: 0
    }
  },
  currencyDefault: 14,
  senderIdType: {
    0: 'Open',
    1: 'List',
    2: 'Static',
    3: 'Numeric',
  },
  createClonePoolRouteFieldLength: {
    routeNameInputBox: {
      min: 3,
      max: 15
    },
    commentsTextArea: {
      min: 3,
      max: 1000
    }
  },
  charsetEncode: ['GSM','ISO-8859-1','ASCII'],
  defaultCharsetEncode : 'GSM',
  dlrType: ['No DLR','Handset DLR','SMSC DLR'],
  defaultDlrType : 'Handset DLR'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
