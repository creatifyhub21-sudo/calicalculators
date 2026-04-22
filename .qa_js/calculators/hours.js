"use strict";
/**
 * Calculates the number of hours and minutes between two times, optionally
 * subtracting a break duration. The algorithm converts the times to
 * minutes, accounts for midnight crossover and subtracts break minutes.
 *
 * It follows the logic similar to that described in Calculator.net's
 * time duration calculator: convert to 24‑hour time, then subtract the
 * start time from the end time, borrowing an hour if needed when the
 * minutes of the start exceed those of the end【762009353709219†L60-L83】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHours = calculateHours;
/**
 * Parses a time string (HH:MM) into total minutes.
 * Returns NaN if invalid.
 */
function toMinutes(timeStr) {
    const [hStr, mStr] = timeStr.split(':');
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
        return NaN;
    }
    return h * 60 + m;
}
/**
 * Calculates the difference between two times in hours and minutes.
 * @param startTimeString Start time in HH:MM format
 * @param endTimeString End time in HH:MM format
 * @param breakMinutes Optional break time to subtract in minutes (default 0)
 * @returns HoursResult with hours and minutes of work time
 */
function calculateHours(startTimeString, endTimeString, breakMinutes = 0) {
    const start = toMinutes(startTimeString);
    const end = toMinutes(endTimeString);
    if (isNaN(start) || isNaN(end)) {
        return null;
    }
    // If the end is earlier than start, assume it crosses midnight
    let diff = end - start;
    if (diff < 0) {
        diff += 24 * 60;
    }
    // Subtract break
    diff -= breakMinutes;
    if (diff < 0)
        diff = 0;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return { hours, minutes };
}
