export function calcSlippage(a: number, b: number): number {
  const slippage: number = ((a - b) / (a + b) / 2) * 100
  return parseFloat(slippage.toFixed(2))
}
