"use strict";
/**
 * Random password generator following best practices. Strong passwords
 * should be at least 12–14 characters long and include uppercase
 * letters, lowercase letters, numbers, and special characters
 *【993922895128992†L478-L486】. Passwords should be generated randomly
 *【993922895128992†L488-L490】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = generatePassword;
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?/~';
/**
 * Generates a random password based on the provided options.
 *
 * @param options Configuration for length and character classes
 * @returns Randomly generated password
 */
function generatePassword(options) {
    let charset = '';
    if (options.includeUpper)
        charset += UPPER;
    if (options.includeLower)
        charset += LOWER;
    if (options.includeNumbers)
        charset += NUMBERS;
    if (options.includeSymbols)
        charset += SYMBOLS;
    if (!charset)
        return '';
    const { length } = options;
    let password = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * charset.length);
        password += charset.charAt(index);
    }
    return password;
}
