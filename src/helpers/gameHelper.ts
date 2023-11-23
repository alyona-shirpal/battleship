import { hitShipModel, selectCell, startGameModel } from './inquirerHelper';

import { Coordinates } from '../types/interfaces/playerData.interface';
import chalk from 'chalk';
import { calculateBoardIndex } from '../utils/calculateBoardIndex';
import { GameBoard } from './gameBord';
import { displayBoard } from '../utils/displayBoard';
import { RedisService } from '../services/redis.service';
import { RedisModel } from '../types/interfaces/redisModel.interface';

export class GameHelper {
  private firstPlayerBoard: string[][];
  private secondPlayerBoard: string[][];
  private isFirstTurn: boolean;
  private redisService: RedisService;

  constructor() {
    this.isFirstTurn = true;
    this.redisService = RedisService.getInstance();
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

    await this.redisService.updateFirstBoard(this.firstPlayerBoard);

    this.secondPlayerBoard = await this.handlePlayerBoard(false);

    await this.redisService.updateSecondBoard(this.secondPlayerBoard);

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

  private async isHit(
    coordinate: Coordinates,
    board: string[][],
    first: boolean,
  ): Promise<boolean> {
    const { columnIndex, rowIndex } = calculateBoardIndex(coordinate);

    if (first) {
      if (board[rowIndex][columnIndex] !== chalk.green('X')) {
        board[rowIndex][columnIndex] = chalk.red('0');

        await this.redisService.updateFirstBoard(board);
        return false;
      } else {
        await this.redisService.updateFirstBoard(board, true);
        return true;
      }
    } else {
      if (board[rowIndex][columnIndex] !== chalk.green('X')) {
        board[rowIndex][columnIndex] = chalk.red('0');
        await this.redisService.updateSecondBoard(board);
        return false;
      } else {
        await this.redisService.updateSecondBoard(board, true);
        return true;
      }
    }
  }

  private async hitProcess(
    board: string[][],
    isFirst: boolean,
    coordinates: Coordinates,
  ): Promise<boolean> {
    const hit = await this.isHit(coordinates, board, isFirst);
    displayBoard(board);

    if (hit) {
      console.log(chalk.green('Woohoo YOU WON'));
    } else {
      console.log(chalk.yellow('You missed (('));
    }
    return hit;
  }

  public async continueGame(data: RedisModel): Promise<void> {
    let { isFirst } = data;
    const { firstBoard, secondBoard } = data;

    let hitShip = false;

    while (!hitShip) {
      const coordinates = await hitShipModel(isFirst);
      const board = isFirst ? secondBoard : firstBoard;
      hitShip = await this.hitProcess(board, isFirst, coordinates);
      if (!hitShip) {
        isFirst = !isFirst;
      }
    }
  }
}
