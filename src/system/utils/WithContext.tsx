import React, { useContext, ReactNode } from "react";

export type WithContextProps<T> = {
  Context: React.Context<T | undefined> | React.Context<T | null>;
  children: (contextValue: T) => ReactNode;
  LoadingComponent?: ReactNode;
};

export function WithContext<T>({ Context, children, LoadingComponent = <div>Loading...</div> }: WithContextProps<T>) {
  const contextValue = useContext(Context as React.Context<T | undefined | null>);
  if (!contextValue) {
    return LoadingComponent;
  }
  return children(contextValue);
}
