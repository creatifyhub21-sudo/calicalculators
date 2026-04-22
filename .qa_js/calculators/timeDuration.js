"use strict";
/**
 * Time duration utilities. Computes the difference between two date/time
 * values in days, hours, minutes and seconds. The algorithm accounts
 * for the complexities of subtracting times when minutes in the start
 * exceed the end minutes by borrowing an hour, similar to the manual
 * method described for time duration calculation【762009353709219†L60-L83】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDuration = calculateDuration;
/**
 * Calculates the duration between two date/time objects.
 *
 * @param start Start Date
 * @param end End Date
 * @returns DurationResult
 */
function calculateDuration(start, end) {
    let diffMs = end.getTime() - start.getTime();
    // if negative, swap
    if (diffMs < 0) {
        diffMs = -diffMs;
    }
    let seconds = Math.floor(diffMs / 1000);
    const days = Math.floor(seconds / (24 * 3600));
    seconds -= days * 24 * 3600;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return { days, hours, minutes, seconds };
}
