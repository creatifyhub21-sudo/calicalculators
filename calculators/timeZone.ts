/**
 * Time zone conversion utilities.
 *
 * Converting times between time zones involves converting the source time
 * to Coordinated Universal Time (UTC) by adding or subtracting the
 * source offset, then applying the target offset【199743674173253†L115-L167】.
 * For example, to convert 18:00 UTC to Central Standard Time (UTC−6),
 * subtract 6 hours (12:00 CST)【199743674173253†L117-L159】. To convert
 * UTC to Central European Time (UTC+1), add 1 hour【199743674173253†L162-L164】.
 */

export interface TimeZone {
  label: string;
  offset: number; // offset in hours relative to UTC (positive east, negative west)
}

// List of some common time zones with offsets relative to UTC. This list can
// be extended or customized. Offsets are based on standard time (non‑DST).
export const TIME_ZONES: TimeZone[] = [
  { label: 'UTC−12', offset: -12 },
  { label: 'UTC−11', offset: -11 },
  { label: 'UTC−10', offset: -10 },
  { label: 'UTC−9', offset: -9 },
  { label: 'UTC−8 (PT)', offset: -8 },
  { label: 'UTC−7 (MT)', offset: -7 },
  { label: 'UTC−6 (CT)', offset: -6 },
  { label: 'UTC−5 (ET)', offset: -5 },
  { label: 'UTC−4', offset: -4 },
  { label: 'UTC−3', offset: -3 },
  { label: 'UTC−2', offset: -2 },
  { label: 'UTC−1', offset: -1 },
  { label: 'UTC', offset: 0 },
  { label: 'UTC+1 (CET)', offset: 1 },
  { label: 'UTC+2 (EET)', offset: 2 },
  { label: 'UTC+3', offset: 3 },
  { label: 'UTC+3:30', offset: 3.5 },
  { label: 'UTC+4', offset: 4 },
  { label: 'UTC+4:30', offset: 4.5 },
  { label: 'UTC+5', offset: 5 },
  { label: 'UTC+5:30', offset: 5.5 },
  { label: 'UTC+5:45', offset: 5.75 },
  { label: 'UTC+6', offset: 6 },
  { label: 'UTC+6:30', offset: 6.5 },
  { label: 'UTC+7', offset: 7 },
  { label: 'UTC+8', offset: 8 },
  { label: 'UTC+9', offset: 9 },
  { label: 'UTC+9:30', offset: 9.5 },
  { label: 'UTC+10', offset: 10 },
  { label: 'UTC+11', offset: 11 },
  { label: 'UTC+12', offset: 12 },
  { label: 'UTC+13', offset: 13 },
  { label: 'UTC+14', offset: 14 },
];

/**
 * Converts a date/time from one time zone to another by adjusting UTC offsets.
 *
 * @param date The source date/time
 * @param fromOffset Hours offset of the source time zone relative to UTC
 * @param toOffset Hours offset of the target time zone relative to UTC
 * @returns A new Date object representing the time in the target zone
 */
export function convertTimeZone(date: Date, fromOffset: number, toOffset: number): Date {
  // Convert the source time to UTC by subtracting the source offset
  const utcMs = date.getTime() - fromOffset * 60 * 60 * 1000;
  // Apply the target offset to get local time in target zone
  const targetMs = utcMs + toOffset * 60 * 60 * 1000;
  return new Date(targetMs);
}