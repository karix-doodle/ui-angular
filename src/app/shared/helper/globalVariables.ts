/**
 * Gateway management START
 */

// Write the global variables

/* Gateway management END */
/* Route management custom && blacklist */
export const accountType = ["Global", "Account"];
export const blacklistAccountType = ["Global", "Gateway", "Account"];
export const mobilePattern = "[0-9]{10,14}"
export const esmeddrPattern = "[0-9]{3,14}"
export const senderidPattern = "[a-zA-Z0-9]{4,8}"
export const templatePattern = "[a-zA-Z0-9]{0,7}"
export const priority = [0, 1, 2, 3, 4, 5];
/* Route management custom && blacklist */

/* Route management Pool route */
export const poolRouteHelper = {
    createClonePoolRouteFieldLength: {
        routeNameInputBox: {
            min: 3,
            max: 15
        },
        commentsTextArea: {
            min: 3,
            max: 500
        }
    },
    createClonePoolRouteGatewaysList: [
        { name: 'Direct', val: 'direct' },
        { name: 'Premium', val: 'premium' },
        { name: 'Wholesale', val: 'wholesale' }
    ]
};
/* Route management Pool route */

