import { GameHelper } from './helpers/gameHelper';

(async () => {
  const game = new GameHelper();
  await game.gameProcess();
})();
