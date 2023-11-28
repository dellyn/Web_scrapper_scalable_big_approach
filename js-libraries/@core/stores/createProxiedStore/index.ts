import { CreateProxiedStore } from './types';

export const createProxiedStore: CreateProxiedStore = (
  store,
  options,
) => {
  const interceptor = options?.interceptor || ((action) => action);

  return (new Proxy(store as any, {
    get(target, prop) {
      if (!(prop in target)) {
        return {};
      }

      const destination = (target as any)[prop];
      if (typeof destination === 'function') {
        return new Proxy(destination, {
          apply(caller, thisObj, args: unknown[]) {
            return interceptor(
              caller,
              caller.name,
              args,
            )(...args);
          },
        });
      }

      return destination;
    },
  })) as any;
};
