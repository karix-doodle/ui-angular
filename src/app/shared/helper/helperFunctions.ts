/**
 * Convert to camelcase sting
 * @param data sting
 */
export function toCamelCase(data) {
    return data.substring(0, 1).toUpperCase() + data.substring(1);
};