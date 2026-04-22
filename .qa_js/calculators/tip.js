"use strict";
/**
 * Tip calculator functions.
 *
 * To calculate a tip, multiply the bill amount by the tip percentage
 * (expressed as a decimal) and add it to the bill【727074470634212†L100-L107】.
 * Alternatively, multiply the bill by 1 plus the tip percentage to get
 * the total amount with tip【727074470634212†L100-L107】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTip = calculateTip;
/**
 * Calculates the tip amount and total amount given a bill, tip percentage,
 * and optional split count. If splitCount > 1, also returns amount per
 * person.
 *
 * @param bill The pre‑tip bill amount
 * @param percentage The tip percentage (e.g., 15 for 15%)
 * @param splitCount Number of people to split the bill
 */
function calculateTip(bill, percentage, splitCount = 1) {
    const tip = bill * (percentage / 100);
    const total = bill + tip;
    let perPerson;
    if (splitCount > 1) {
        perPerson = total / splitCount;
    }
    return { tip, total, perPerson };
}
