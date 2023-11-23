import inquirer from 'inquirer';
import {
  Coordinates,
  PlayerDataInterface,
} from '../types/interfaces/playerData.interface';
import { Message } from '../types/enums/message.enum';
import { StartChoice } from '../types/enums/startChoice.enum';

export async function selectCell(isFirst: boolean): Promise<Coordinates> {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'row',
      message: isFirst ? Message.FIRST_SELECT_ROW : Message.SECOND_SELECT_ROW,
      validate: (input) => (/^[1-8]$/.test(input) ? true : Message.ROW_ERROR),
    },
    {
      type: 'input',
      name: 'column',
      message: isFirst
        ? Message.FIRST_SELECT_COLUMN
        : Message.SECOND_SELECT_COLUMN,
      validate: (input) =>
        /^[A-Ha-h]$/.test(input) ? true : Message.COLUMN_ERROR,
    },
  ]);
}

export async function startGameModel(
  firstPlayer: boolean,
): Promise<Pick<PlayerDataInterface, 'name'>> {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: firstPlayer
        ? Message.FIRST_PLAYER_NAME
        : Message.SECOND_PLAYER_NAME,
    },
  ]);
}

export async function hitShipModel(isFirst: boolean): Promise<Coordinates> {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'row',
      message: isFirst ? Message.FIRST_ROW_HIT : Message.SECOND_ROW_HIT,
      validate: (input) => (/^[1-8]$/.test(input) ? true : Message.ROW_ERROR),
    },
    {
      type: 'input',
      name: 'column',
      message: 'Now, hit the column (A-H):',
      validate: (input) =>
        /^[A-Ha-h]$/.test(input) ? true : Message.COLUMN_ERROR,
    },
  ]);
}

export async function startModel(): Promise<{ start: string }> {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'start',
      choices: [StartChoice.CONTINUE, StartChoice.NEW_GAME],
    },
  ]);
}
