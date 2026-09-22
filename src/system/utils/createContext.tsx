import { createContext as createReactContext, useContext, Context } from "react";

type CreateContextOptions = {
  name: string;
  errorMessage: string;
};

type ContextResult<T> = {
  Provider: Context<T | null>["Provider"];
  useContext: () => T;
  Context: Context<T | null>;
};

/**
 * Generic context creation utility that provides type-safe context with error handling
 */
export function createContext<T>(options: CreateContextOptions): ContextResult<T> {
  const { name, errorMessage } = options;

  const Context = createReactContext<T | null>(null);
  Context.displayName = name;

  const useContextHook = (): T => {
    const context = useContext(Context);
    if (context === null) {
      throw new Error(errorMessage);
    }
    return context;
  };

  return {
    Provider: Context.Provider,
    useContext: useContextHook,
    Context,
  };
}
