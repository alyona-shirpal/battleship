import Redis from 'ioredis';
import { RedisKey } from '../types/enums/redisKey.enum';
import { RedisModel } from '../types/interfaces/redisModel.interface';

export class RedisService {
  private static instance: RedisService;
  private redisClient: Redis;

  static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
      RedisService.instance.redisClient = new Redis({
        host: '127.0.0.1',
        port: 6379,
      });
    }
    return RedisService.instance;
  }

  public async updateFirstBoard(
    firstBoard: string[][],
    isOver = false,
  ): Promise<void> {
    const data = await this.getData();
    data.firstBoard = firstBoard;
    data.isFirst = true;
    data.isOver = isOver;
    await this.redisClient.set(RedisKey.LAST_GAME, JSON.stringify(data));
  }

  public async updateSecondBoard(
    secondBoard: string[][],
    isOver = false,
  ): Promise<void> {
    const data = await this.getData();
    data.secondBoard = secondBoard;
    data.isFirst = false;
    data.isOver = isOver;
    await this.redisClient.set(RedisKey.LAST_GAME, JSON.stringify(data));
  }

  public async getData(): Promise<RedisModel> {
    const storedData = await this.redisClient.get(RedisKey.LAST_GAME);
    return storedData
      ? JSON.parse(storedData)
      : { firstBoard: [], secondBoard: [], isFirst: false, isOver: false };
  }
}
