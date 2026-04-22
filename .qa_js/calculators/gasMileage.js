"use strict";
/**
 * Gas mileage calculator.
 *
 * Miles per gallon (mpg) is calculated by dividing miles driven by
 * gallons used, and kilometers per liter (km/l) is calculated by
 * dividing kilometers driven by liters used【152182459399179†L129-L132】.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateGasMileage = calculateGasMileage;
function calculateGasMileage(input) {
    const result = {};
    const { distance, distanceUnit, fuelUsed, fuelUnit } = input;
    if (distanceUnit === 'mi' && fuelUnit === 'gal') {
        result.mpg = distance / fuelUsed;
        // convert to km/l too
        const km = distance * 1.60934;
        const liters = fuelUsed * 3.78541;
        result.kml = km / liters;
        result.lper100km = 100 / result.kml;
    }
    else if (distanceUnit === 'km' && fuelUnit === 'l') {
        result.kml = distance / fuelUsed;
        result.lper100km = 100 / result.kml;
        const miles = distance * 0.621371;
        const gallons = fuelUsed * 0.264172;
        result.mpg = miles / gallons;
    }
    else {
        // Mixed units: convert both to metric then compute both results
        const miles = distanceUnit === 'km' ? input.distance * 0.621371 : input.distance;
        const km = distanceUnit === 'mi' ? input.distance * 1.60934 : input.distance;
        const gallons = fuelUnit === 'l' ? input.fuelUsed * 0.264172 : input.fuelUsed;
        const liters = fuelUnit === 'gal' ? input.fuelUsed * 3.78541 : input.fuelUsed;
        result.mpg = miles / gallons;
        result.kml = km / liters;
        result.lper100km = 100 / result.kml;
    }
    return result;
}
