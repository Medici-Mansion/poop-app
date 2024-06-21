import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ForwardedRef } from 'react';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}