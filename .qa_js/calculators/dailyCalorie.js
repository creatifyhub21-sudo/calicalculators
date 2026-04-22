"use strict";
/**
 * Daily calorie needs calculator utilities.
 *
 * Daily calorie needs can be estimated by multiplying a person’s BMR by an
 * activity factor (creating the Total Daily Energy Expenditure, TDEE). To
 * adjust for weight loss or gain, the common rule of thumb is that
 * approximately 3,500 calories equate to one pound of body weight. Thus,
 * shaving 500 calories off your daily allotment should lead to about one
 * pound of weight loss per week【538959938740166†L110-L117】. Conversely, adding
 * calories supports weight gain. These values are approximations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.weightGoalAdjustments = void 0;
exports.calculateDailyCalories = calculateDailyCalories;
/** Weight goal options with their corresponding calorie adjustments per day. */
exports.weightGoalAdjustments = {
    maintain: 0,
    'lose 0.5 lb/wk': -250,
    'lose 1 lb/wk': -500,
    'gain 0.5 lb/wk': 250,
    'gain 1 lb/wk': 500,
};
/**
 * Calculates recommended daily calories based on BMR, activity factor and
 * weight goal. It returns the maintenance calories (BMR × activity factor)
 * and the adjusted calories for the specified weight goal.
 *
 * @param bmr - Basal metabolic rate (cal/day)
 * @param activityFactor - Activity multiplier
 * @param goal - Goal string (see weightGoalAdjustments keys)
 * @returns An object with maintenance and goal calories
 */
function calculateDailyCalories(bmr, activityFactor, goal = 'maintain') {
    const maintenance = bmr * activityFactor;
    const adjustment = exports.weightGoalAdjustments[goal] ?? 0;
    const goalCalories = maintenance + adjustment;
    return { maintenance: parseFloat(maintenance.toFixed(2)), goalCalories: parseFloat(goalCalories.toFixed(2)) };
}
