export type AngleMode = 'deg' | 'rad';

function toRadians(value: number, angleMode: AngleMode) {
  return angleMode === 'deg' ? (value * Math.PI) / 180 : value;
}

function fromRadians(value: number, angleMode: AngleMode) {
  return angleMode === 'deg' ? (value * 180) / Math.PI : value;
}

function factorial(value: number) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error('Factorial needs a non-negative integer');
  }
  let result = 1;
  for (let i = 2; i <= value; i += 1) result *= i;
  return result;
}

function normalizeExpression(expr: string) {
  return expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/\^/g, '**')
    .replace(/π/g, 'PI')
    .replace(/\bpi\b/gi, 'PI')
    .replace(/\bln\b/gi, 'ln')
    .replace(/\blog\b/gi, 'log10')
    .replace(/\bEXP\b/g, 'e')
    .replace(/\bRnd\b/g, 'rand()')
    .replace(/\be\^/gi, 'exp')
    .replace(/(\d+(?:\.\d+)?)!/g, 'fact($1)')
    .replace(/\be\b/g, 'E');
}

export function evaluateExpression(expr: string, angleMode: AngleMode = 'rad'): number {
  const normalized = normalizeExpression(expr);

  const scope = {
    PI: Math.PI,
    E: Math.E,
    abs: Math.abs,
    sqrt: Math.sqrt,
    cbrt: Math.cbrt,
    exp: Math.exp,
    pow10: (value: number) => 10 ** value,
    ln: Math.log,
    log10: (value: number) => Math.log10(value),
    sin: (value: number) => Math.sin(toRadians(value, angleMode)),
    cos: (value: number) => Math.cos(toRadians(value, angleMode)),
    tan: (value: number) => Math.tan(toRadians(value, angleMode)),
    asin: (value: number) => fromRadians(Math.asin(value), angleMode),
    acos: (value: number) => fromRadians(Math.acos(value), angleMode),
    atan: (value: number) => fromRadians(Math.atan(value), angleMode),
    recip: (value: number) => 1 / value,
    rand: () => Math.random(),
    fact: factorial,
  };

  const names = Object.keys(scope);
  const values = Object.values(scope);

  try {
    const fn = new Function(...names, `return (${normalized});`);
    const result = fn(...values);
    if (typeof result !== 'number' || !Number.isFinite(result)) {
      throw new Error('Result is not a finite number');
    }
    return result;
  } catch {
    throw new Error('Invalid expression');
  }
}
