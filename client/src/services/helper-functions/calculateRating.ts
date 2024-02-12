export const calculateStars: (a: number) => number[] = (value: number) => {
  // keep pushing full stars while the value is greater than 0
  const arr: number[] = new Array<number>();
  let n = value;

  while (n >= 1) {
    arr.push(1);
    n--;
  }

  if (n > 0) arr.push(0.5);

  return arr;
};
