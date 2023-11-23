export enum Message {
  FIRST_PLAYER_NAME = 'The game is about to kick off! Enter your player name:',
  SECOND_PLAYER_NAME = 'Second player, enter your name:',
  FIRST_SELECT_ROW = 'First player, select a row (1-8):',
  SECOND_SELECT_ROW = 'Second player, select a row (1-8):',
  FIRST_SELECT_COLUMN = 'First player, select a column (A-H):',
  SECOND_SELECT_COLUMN = 'Second player, select a column (A-H):',
  FIRST_ROW_HIT = 'First player, hit the row (1-8):',
  SECOND_ROW_HIT = 'Second player, hit the ship (1-8):',
  ROW_ERROR = 'Please enter a valid row number.',
  COLUMN_ERROR = 'Please enter a valid column letter (A-H).',
}
