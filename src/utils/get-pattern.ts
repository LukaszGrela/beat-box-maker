export const getPattern = (beats: number[][], column: number): number[] => {
  return beats
    .map((row: number[]): number => {
      if (Math.abs(column) < row.length - 1) {
        return row[Math.abs(column)];
      }
      return 0; //out-of-range
    })
    .filter((n) => n);
};
