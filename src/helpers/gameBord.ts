import { Coordinates } from '../types/interfaces/playerData.interface';
import chalk from 'chalk';
import { calculateBoardIndex } from '../utils/calculateBoardIndex';
import { displayBoard } from '../utils/displayBoard';

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
      return displayBoard(this.firstBoard);
    } else {
      return displayBoard(this.secondBord);
    }
  }

  public updateGameBoard(coordinate: Coordinates) {
    const { columnIndex, rowIndex } = calculateBoardIndex(coordinate);

    this.isFirstPlayer
      ? (this.firstBoard[rowIndex][columnIndex] = chalk.green('X'))
      : (this.secondBord[rowIndex][columnIndex] = chalk.green('X'));
  }
}
