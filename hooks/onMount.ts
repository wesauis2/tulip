import useEffect, { EffectCallback } from "./useEffect";

export default function onMount(effect: EffectCallback) {
  useEffect(effect, []);
}
