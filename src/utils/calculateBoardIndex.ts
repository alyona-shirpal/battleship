import { Coordinates } from '../types/interfaces/playerData.interface';

export function calculateBoardIndex(coordinate: Coordinates): {
  rowIndex: number;
  columnIndex: number;
} {
  const columnIndex = coordinate.column.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  const rowIndex = parseInt(coordinate.row);
  return { rowIndex, columnIndex };
}
