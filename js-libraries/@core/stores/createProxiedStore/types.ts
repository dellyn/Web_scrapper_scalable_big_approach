export type CreateProxiedStore = <
  Type = any,
  State = any,
  Store = any,
>(
  store: Store,
  options?: {
    interceptor?: (
      action: (...args: any[]) => any,
      type: Type,
      args: Parameters<typeof action>,
    ) => typeof action;
  },
) => Store;
