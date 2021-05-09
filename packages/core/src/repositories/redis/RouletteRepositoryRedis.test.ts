import RouletteRepositoryRedis from './RouletteRepositoryRedis';
import RedisMock from 'ioredis';
import Roulette from '../../domain/RouletteEntity';

describe('RouletteRepositoryRedis', () => {
	const redis = new RedisMock();
	const rouletteRepositoryRedis = new RouletteRepositoryRedis(redis);
	const roulette: Roulette = new Roulette({
		name: 'Royal 007',
		id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
		isOpen: false
	});
	const rouletteDTO =
		'{"id":"ff6960b0-b015-11eb-8b4e-bd5c14d98227","isOpen":false,"name":"Royal 007"}';

	it('Should create roullete', async () => {
		await rouletteRepositoryRedis.create(roulette);
		expect(redis.set).toHaveBeenCalledWith(
			'ROULETTE:ROULETTE:ff6960b0-b015-11eb-8b4e-bd5c14d98227',
			rouletteDTO
		);
		expect(redis.set).toHaveBeenCalledTimes(1);
		expect(redis.sadd).toHaveBeenCalledWith(
			'ROULETTE:ROULETTE',
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(redis.sadd).toHaveBeenCalledTimes(1);
	});

	it('Should update roulette', async () => {
		await rouletteRepositoryRedis.update(roulette);
		expect(redis.set).toHaveBeenCalledWith(
			'ROULETTE:ROULETTE:ff6960b0-b015-11eb-8b4e-bd5c14d98227',
			rouletteDTO
		);
		expect(redis.set).toHaveBeenCalledTimes(1);
		expect(redis.sadd).toHaveBeenCalledWith(
			'ROULETTE:ROULETTE',
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(redis.sadd).toHaveBeenCalledTimes(1);
	});

	it('Should find roulette by ID', async () => {
		redis.get = jest.fn().mockResolvedValue(rouletteDTO);
		const rouletteRetrieved = await rouletteRepositoryRedis.findById(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(rouletteRetrieved).toEqual(roulette);
		expect(redis.get).toHaveBeenCalledWith(
			'ROULETTE:ROULETTE:ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(redis.get).toHaveBeenCalledTimes(1);
	});

	it('Should return null if roulette was not found by ID', async () => {
		redis.get = jest.fn().mockResolvedValue(null);
		const rouletteRetrieved = await rouletteRepositoryRedis.findById(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(rouletteRetrieved).toBe(null);
		expect(redis.get).toHaveBeenCalledWith(
			'ROULETTE:ROULETTE:ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(redis.get).toHaveBeenCalledTimes(1);
	});

	it('Should return all roulettes', async () => {
		const findByIdSpy = jest
			.spyOn(rouletteRepositoryRedis, 'findById')
			.mockResolvedValue(roulette);
		redis.smembers = jest
			.fn()
			.mockResolvedValue(['ff6960b0-b015-11eb-8b4e-bd5c14d98227']);
		const roulettes = await rouletteRepositoryRedis.find();
		expect(roulettes).toEqual([roulette]);
		expect(findByIdSpy).toHaveBeenCalledWith(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(findByIdSpy).toHaveBeenCalledTimes(1);
		expect(redis.smembers).toHaveBeenCalledWith('ROULETTE:ROULETTE');
		expect(redis.smembers).toBeCalledTimes(1);
	});

	it('Should return empty array finding all roulettes', async () => {
		const findByIdSpy = jest
			.spyOn(rouletteRepositoryRedis, 'findById')
			.mockResolvedValue(null);
		redis.smembers = jest
			.fn()
			.mockResolvedValue(['ff6960b0-b015-11eb-8b4e-bd5c14d98227']);
		const roulettes = await rouletteRepositoryRedis.find();
		expect(roulettes).toEqual([]);
		expect(findByIdSpy).toHaveBeenCalledWith(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(findByIdSpy).toHaveBeenCalledTimes(1);
		expect(redis.smembers).toHaveBeenCalledWith('ROULETTE:ROULETTE');
		expect(redis.smembers).toBeCalledTimes(1);
	});
});
