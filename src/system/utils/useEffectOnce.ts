import { useEffect, useRef } from "react";

export type MaybePromise<T> = Promise<T> | T;

export function useEffectOnce(fn: () => MaybePromise<unknown>) {
  const isMounted = useRef(false);

  useEffect(() => {
    !isMounted.current && fn();
    isMounted.current = true;
  }, [fn]);
}
