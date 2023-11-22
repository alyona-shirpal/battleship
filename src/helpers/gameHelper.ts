import { hitShipModel, selectCell, startGameModel } from './inquirerHelper';
import { GameBoard } from './gameBord';
import { Coordinate } from '../types/playerData';
import chalk from 'chalk';

async function handlePlayer(isFirstPlayer: boolean): Promise<string[][]> {
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

export async function gameProcess() {
  const firstPlayerBoard = await handlePlayer(true);

  const secondPlayerBoard = await handlePlayer(false);

  let first = true;
  let hitShip = false;

  while (!hitShip) {
    const coordinates = await hitShipModel(first);
    const board = first ? secondPlayerBoard : firstPlayerBoard;
    hitShip = await hitProcess(board, first, coordinates);
    if (!hitShip) {
      first = !first;
    }
  }
}

function isHit(
  coordinate: Coordinate,
  board: string[][],
  first: boolean,
): boolean {
  const columnIndex = coordinate.column.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  const rowIndex = parseInt(coordinate.row);

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

function generalDisplayBoard(board: string[][]): string[][] {
  board.forEach((row) => {
    console.log(row.join(' '));
  });
  return board;
}

export async function hitProcess(
  board: any,
  isFirst: boolean,
  coordinates: Coordinate,
): Promise<boolean> {
  const hit = isHit(coordinates, board, isFirst);

  generalDisplayBoard(board);

  if (hit) {
    console.log(chalk.green('Woohoo YOU WON'));
  } else {
    console.log(chalk.yellow('You missed (('));
  }
  return hit;
}
