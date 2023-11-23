import { GameHelper } from './helpers/gameHelper';
import { startModel } from './helpers/inquirerHelper';
import { StartChoice } from './types/enums/startChoice.enum';
import { RedisService } from './services/redis.service';
import chalk from 'chalk';

(async () => {
  const gameHelper = new GameHelper();
  const redisService = RedisService.getInstance();
  const startGameModel = await startModel();

  if (startGameModel.start === StartChoice.CONTINUE) {
    const data = await redisService.getData();

    if (data.isOver === true) {
      console.log(chalk.underline.blue('The previous game is over!'));

      await gameHelper.gameProcess();
    }

    await gameHelper.continueGame(data);
  } else {
    await gameHelper.gameProcess();
  }
})();
