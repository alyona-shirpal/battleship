export function displayBoard(board: string[][]): string[][] {
  board.forEach((row) => {
    console.log(row.join(' '));
  });
  return board;
}
