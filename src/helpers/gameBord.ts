import { Coordinate } from '../types/playerData';
import chalk from 'chalk';

export class GameBoard {
  private firstBoard: string[][];
  private secondBord: string[][];
  private isFirstPlayer: boolean;

  constructor(isFirst: boolean) {
    this.firstBoard = [[' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']];
    this.secondBord = [[' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']];
    this.isFirstPlayer = isFirst;
    this.generateBoard();
  }

  private generateBoard() {
    for (let row = 1; row <= 8; row++) {
      const rowCells = [row.toString()];
      for (let col = 0; col < 8; col++) {
        rowCells.push(chalk.yellow('-'));
      }
      this.isFirstPlayer
        ? this.firstBoard.push(rowCells)
        : this.secondBord.push(rowCells);
    }
  }

  public displayBoard(): string[][] {
    if (this.isFirstPlayer) {
      this.firstBoard.forEach((row) => {
        console.log(row.join(' '));
      });
      return this.firstBoard;
    } else {
      this.secondBord.forEach((row) => {
        console.log(row.join(' '));
      });
      return this.secondBord;
    }
  }

  public updateGameBoard(coordinate: Coordinate) {
    const columnIndex = coordinate.column.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    const rowIndex = parseInt(coordinate.row);

    this.isFirstPlayer
      ? (this.firstBoard[rowIndex][columnIndex] = chalk.green('X'))
      : (this.secondBord[rowIndex][columnIndex] = chalk.green('X'));
  }
}
