/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */

export function isDefined<T>(arg: T | undefined): arg is T {
  return typeof arg !== 'undefined';
}

export function isPresent<T>(arg: T | undefined | null): arg is T {
  return arg !== null && typeof arg !== 'undefined';
}
