import { sub } from "@full-stack-ts/shared";

export function add(a: number, b: number, c: number = 0): number {
  return a + b + c;
}

document.querySelector('#answer')!.innerHTML = `${add(3, sub(12, 3))}`;
