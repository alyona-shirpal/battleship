import { hitShipModel, selectCell, startGameModel } from './inquirerHelper';

import { Coordinates } from '../types/playerData';
import chalk from 'chalk';
import { calculateBoardIndex } from '../utils/calculateBoardIndex';
import { GameBoard } from './gameBord';
import { displayBoard } from '../utils/displayBoard';

export class GameHelper {
  private firstPlayerBoard: string[][];
  private secondPlayerBoard: string[][];
  private isFirstTurn: boolean;

  constructor() {
    this.isFirstTurn = true;
  }

  private async handlePlayerBoard(isFirstPlayer: boolean): Promise<string[][]> {
    await startGameModel(isFirstPlayer);

    const board = new GameBoard(isFirstPlayer);

    board.displayBoard();

    const answers = await selectCell(isFirstPlayer);

    console.log(
      `You selected row ${answers.row}, column ${answers.column.toUpperCase()}`,
    );

    board.updateGameBoard(answers);

    return board.displayBoard();
  }

  public async gameProcess() {
    this.firstPlayerBoard = await this.handlePlayerBoard(true);
    this.secondPlayerBoard = await this.handlePlayerBoard(false);

    let hitShip = false;

    while (!hitShip) {
      const coordinates = await hitShipModel(this.isFirstTurn);
      const board = this.isFirstTurn
        ? this.secondPlayerBoard
        : this.firstPlayerBoard;
      hitShip = await this.hitProcess(board, this.isFirstTurn, coordinates);
      if (!hitShip) {
        this.isFirstTurn = !this.isFirstTurn;
      }
    }
  }

  private isHit(
    coordinate: Coordinates,
    board: string[][],
    first: boolean,
  ): boolean {
    const { columnIndex, rowIndex } = calculateBoardIndex(coordinate);

    if (first) {
      if (board[rowIndex][columnIndex] !== chalk.green('X')) {
        board[rowIndex][columnIndex] = chalk.red('0');
        return false;
      } else {
        return true;
      }
    } else {
      if (board[rowIndex][columnIndex] !== chalk.green('X')) {
        board[rowIndex][columnIndex] = chalk.red('0');
        return false;
      } else {
        return true;
      }
    }
  }

  private async hitProcess(
    board: string[][],
    isFirst: boolean,
    coordinates: Coordinates,
  ): Promise<boolean> {
    const hit = this.isHit(coordinates, board, isFirst);
    displayBoard(board);

    if (hit) {
      console.log(chalk.green('Woohoo YOU WON'));
    } else {
      console.log(chalk.yellow('You missed (('));
    }
    return hit;
  }
}
