import RedisMock from 'ioredis';
import redisRepositoryFactory from './index';
import RouletteRepositoryRedisMock from './RouletteRepositoryRedis';
import BetRepositoryRedisMock from './BetRepositoryRedis';

jest.mock('./RouletteRepositoryRedis', () => {
	return jest.fn().mockReturnValue({});
});

jest.mock('./BetRepositoryRedis', () => {
	return jest.fn().mockReturnValue({});
});

test('Should instantiate repositories', () => {
	const repository = redisRepositoryFactory();

	expect(RedisMock).toHaveBeenLastCalledWith({
		host: '127.127.127.127',
		port: 1000,
		password: 'password',
		db: 12
	});
	expect(RedisMock).toHaveBeenCalledTimes(1);
	expect(RouletteRepositoryRedisMock).toHaveBeenCalledWith(new RedisMock());
	expect(RouletteRepositoryRedisMock).toHaveBeenCalledTimes(1);
	expect(BetRepositoryRedisMock).toHaveBeenCalledWith(new RedisMock());
	expect(BetRepositoryRedisMock).toHaveBeenCalledTimes(1);
	expect(repository).toEqual({
		roulette: {},
		bet: {}
	});
});
