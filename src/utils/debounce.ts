type TimeoutId = ReturnType<typeof setTimeout>;

export const debounce = <F extends (...args: any[]) => any>(
  fn: F,
  delay: number
) => {
  let timeoutId: TimeoutId;

  return function debounced(...args: Parameters<F>) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
