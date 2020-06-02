import Redis from 'ioredis';
import Repository, { RouletteRepository, BetRepository } from '../Repository';
import RouletteRepositoryRedis from './RouletteRepositoryRedis';
import BetRepositoryRedis from './BetRepositoryRedis';

const REDIS_HOST: string = process.env['REDIS_HOST'] || 'redis';
const REDIS_PORT: number = process.env['REDIS_PORT']
  ? parseInt(process.env['REDIS_PORT'])
  : 6379;
const REDIS_PASSWORD: string = process.env['REDIS_PASSWORD'] || '';
const REDIS_DB: number = process.env['REDIS_DB']
  ? parseInt(process.env['REDIS_DB'])
  : 0;

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  db: REDIS_DB
});

export default (): Repository => {
  const roulette: RouletteRepository = new RouletteRepositoryRedis(redis);
  const bet: BetRepository = new BetRepositoryRedis(redis);

  return {
    roulette,
    bet
  };
};
