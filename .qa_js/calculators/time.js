"use strict";
/**
 * Functions for simple time calculations such as adding or subtracting
 * hours and minutes to a given time. Times are treated without dates
 * and wrap around 24 hours. A time is represented as an object with
 * hours (0–23) and minutes (0–59).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTime = parseTime;
exports.formatTime = formatTime;
exports.addTime = addTime;
/**
 * Parses a time string in HH:MM format into a Time object. If the
 * string is invalid, returns null.
 */
function parseTime(timeStr) {
    const [hStr, mStr] = timeStr.split(':');
    const hours = parseInt(hStr, 10);
    const minutes = parseInt(mStr, 10);
    if (isNaN(hours) ||
        isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59) {
        return null;
    }
    return { hours, minutes };
}
/**
 * Formats a Time object back into HH:MM string with zero padding.
 */
function formatTime(time) {
    const h = time.hours.toString().padStart(2, '0');
    const m = time.minutes.toString().padStart(2, '0');
    return `${h}:${m}`;
}
/**
 * Adds or subtracts a duration (in hours and minutes) to a given time.
 * @param time The original time
 * @param deltaHours Hours to add (can be negative)
 * @param deltaMinutes Minutes to add (can be negative)
 * @returns The resulting time, wrapped within 24 hours
 */
function addTime(time, deltaHours, deltaMinutes) {
    // Convert original time to minutes
    let totalMinutes = time.hours * 60 + time.minutes;
    // Convert delta to minutes
    totalMinutes += deltaHours * 60 + deltaMinutes;
    // Normalize to [0, 24*60)
    const minutesInDay = 24 * 60;
    totalMinutes = ((totalMinutes % minutesInDay) + minutesInDay) % minutesInDay;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}
