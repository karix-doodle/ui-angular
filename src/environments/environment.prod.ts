export const environment = {
  production: true,
 // serverUrl: 'http://115.114.108.242/api/intlmgmt',
  serverUrl: '/erpinternational/api',
  FileUploadUrl: '/erpinternational/api',
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
  customerTypes: ['Direct', 'Premium', 'Wholesale'],
  dateTimePickerTimeDifference: 10,
  invalidSessionMsg: 'Invalid session. please try <b>login</b> again.',
  userLoggedOutMsg: 'You have been successfully logged out!',
  basePortUrl: 'http://localhost:4200/'
};
