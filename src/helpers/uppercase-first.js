/**
 * To uppercase the first letter of a string
 * @param {string} text  text to uppercase
 * @returns 
 */
export default function uppercaseFirst(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}