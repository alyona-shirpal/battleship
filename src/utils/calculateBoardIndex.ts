import { Coordinates } from '../types/playerData';

export function calculateBoardIndex(coordinate: Coordinates): {
  rowIndex: number;
  columnIndex: number;
} {
  const columnIndex = coordinate.column.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  const rowIndex = parseInt(coordinate.row);
  return { rowIndex, columnIndex };
}
