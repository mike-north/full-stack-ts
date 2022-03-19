export function add(a: number, b: number, c: number = 0): number {
  return a + b + c+100;
}

document.querySelector('#answer')!.innerHTML = `${add(3, 119)}`;
