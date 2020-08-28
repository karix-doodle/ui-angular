// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //serverUrl: '/erpinternational/api',
  //FileUploadUrl: '/erpinternational/api',
  //serverUrl: 'http://115.114.108.242/api/intlmgmt',
  //FileUploadUrl: 'http://10.20.59.248:8989/api/intlmgmt',
  serverUrl: 'http://localhost:8383/api/intlmgmt',
  //FileUploadUrl: 'http://10.20.51.182:8484/api/intlmgmt',
  FileUploadUrl: 'http://localhost:8383/api/intlmgmt',
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
  charsetEncode: ['GSM', 'ISO-8859-1', 'ASCII'],
  defaultCharsetEncode: 'GSM',
  dlrType: ['No DLR', 'Handset DLR', 'SMSC DLR'],
  customerTypes: ['direct', 'premium', 'wholesale'],
  dateTimePickerTimeDifference: 10,
  invalidSessionMsg: 'Invalid session. please try <b>login</b> again.',
  userLoggedOutMsg: 'You have been successfully logged out!',
  basePortUrl: 'http://localhost:4200/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
