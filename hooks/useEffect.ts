import { DependencyList, useEffect as useEffectSync } from "react";

export type FnSync<T> = () => T;
export type FnAsync<T> = () => Promise<T>;

export type EffectCallback =
  | FnSync<void | FnSync<void> | FnAsync<void>>
  | FnAsync<void | FnSync<void> | FnAsync<void>>;

/**
 * Same as the `React.useEffect` hook, with async support.
 *
 * @param effect Imperative function that can return a cleanup function
 * @param deps If present, effect will only activate if the values in the list change.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useeffect
 */
export default function useEffect(
  effect: EffectCallback,
  deps?: DependencyList
): void {
  useEffectSync(() => {
    const cleanup = Promise.resolve(effect());

    return () => {
      cleanup.then((cleanupFn) => {
        if (typeof cleanupFn == "function") {
          return cleanupFn();
        }
      });
    };
  }, deps);
}
