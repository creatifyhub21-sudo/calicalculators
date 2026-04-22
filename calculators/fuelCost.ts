/**
 * Fuel cost calculator.
 *
 * The cost of fuel for a trip can be calculated by dividing the distance
 * by the vehicle's fuel efficiency to get the number of gallons (or
 * liters) consumed, then multiplying by the fuel price【62850652270274†L160-L172】.
 */

export interface FuelCostInput {
  distance: number;
  distanceUnit: 'mi' | 'km';
  efficiency: number;
  efficiencyUnit: 'mpg' | 'kmpl' | 'lper100km';
  price: number;
  priceUnit: 'perGallon' | 'perLiter';
}

export interface FuelCostResult {
  fuelNeeded: number;
  cost: number;
}

/**
 * Computes fuel needed and total cost based on input units.
 */
export function calculateFuelCost(input: FuelCostInput): FuelCostResult {
  // Convert distance to miles
  const distanceMiles = input.distanceUnit === 'km' ? input.distance * 0.621371 : input.distance;

  // Compute fuel efficiency in miles per gallon
  let mpg: number;
  switch (input.efficiencyUnit) {
    case 'mpg':
      mpg = input.efficiency;
      break;
    case 'kmpl':
      // kilometres per litre -> miles per gallon
      mpg = input.efficiency * 0.621371 / 0.264172;
      break;
    case 'lper100km':
      // litres per 100 km -> km per litre = 100 / lper100km
      const kmpl = 100 / input.efficiency;
      mpg = kmpl * 0.621371 / 0.264172;
      break;
    default:
      mpg = input.efficiency;
  }

  // Gallons consumed
  const gallons = distanceMiles / mpg;
  // Fuel price per gallon
  const pricePerGallon = input.priceUnit === 'perGallon' ? input.price : input.price * 3.78541;
  const cost = gallons * pricePerGallon;
  return { fuelNeeded: gallons, cost };
}