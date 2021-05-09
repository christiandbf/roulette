import BetRepositoryRedis from './BetRepositoryRedis';
import RedisMock from 'ioredis';
import Bet from '../../domain/BetEntity';
import Option from '../../domain/OptionValueObject';

describe('BetRepositoryRedis', () => {
	const redis = new RedisMock();
	const betRepositoryRedis = new BetRepositoryRedis(redis);
	const bet: Bet = new Bet({
		amount: 1000,
		option: new Option({ selection: 'RED' }),
		rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
		userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98228',
		id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
	});
	const betDTO =
		'{"id":"ff6960b0-b015-11eb-8b4e-bd5c14d98229","selection":"RED","rouletteId":"ff6960b0-b015-11eb-8b4e-bd5c14d98227","userId":"ff6960b0-b015-11eb-8b4e-bd5c14d98228","amount":1000}';

	it('Should create bet', async () => {
		await betRepositoryRedis.create(bet);
		expect(redis.set).toHaveBeenCalledWith(
			'ROULETTE:BET:ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			betDTO
		);
		expect(redis.set).toHaveBeenCalledTimes(1);
		expect(redis.sadd).toHaveBeenCalledWith(
			'ROULETTE:BET:ff6960b0-b015-11eb-8b4e-bd5c14d98227',
			'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		);
		expect(redis.sadd).toHaveBeenCalledTimes(1);
	});

	it('Should update bet', async () => {
		await betRepositoryRedis.update(bet);
		expect(redis.set).toHaveBeenCalledWith(
			'ROULETTE:BET:ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			betDTO
		);
		expect(redis.set).toHaveBeenCalledTimes(1);
		expect(redis.sadd).toHaveBeenCalledWith(
			'ROULETTE:BET:ff6960b0-b015-11eb-8b4e-bd5c14d98227',
			'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		);
		expect(redis.sadd).toHaveBeenCalledTimes(1);
	});

	it('Should throw exception find not implemented', () => {
		expect(() => {
			betRepositoryRedis.find();
		}).toThrowError('Method not implemented.');
	});

	it('Should find bet by ID', async () => {
		redis.get = jest.fn().mockResolvedValue(betDTO);
		const betRetrieved = await betRepositoryRedis.findById(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		);
		expect(betRetrieved).toEqual(bet);
		expect(redis.get).toHaveBeenCalledWith(
			'ROULETTE:BET:ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		);
		expect(redis.get).toHaveBeenCalledTimes(1);
	});

	it('Should return null if bet was not found by ID', async () => {
		redis.get = jest.fn().mockResolvedValue(null);
		const betRetrieved = await betRepositoryRedis.findById(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		);
		expect(betRetrieved).toBe(null);
	});

	it('Should return bets with roulette ID', async () => {
		const findByIdSpy = jest
			.spyOn(betRepositoryRedis, 'findById')
			.mockResolvedValue(bet);
		redis.smembers = jest
			.fn()
			.mockResolvedValue(['ff6960b0-b015-11eb-8b4e-bd5c14d98229']);
		const bets = await betRepositoryRedis.findByRouletteId(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(bets).toEqual([bet]);
		expect(findByIdSpy).toHaveBeenCalledWith(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		);
		expect(findByIdSpy).toHaveBeenCalledTimes(1);
		expect(redis.smembers).toHaveBeenCalledWith(
			'ROULETTE:BET:ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(redis.smembers).toBeCalledTimes(1);
	});

	it('Should return empty array if bets have not been found with roulette ID', async () => {
		const findByIdSpy = jest
			.spyOn(betRepositoryRedis, 'findById')
			.mockResolvedValue(null);
		redis.smembers = jest
			.fn()
			.mockResolvedValue(['ff6960b0-b015-11eb-8b4e-bd5c14d98229']);
		const bets = await betRepositoryRedis.findByRouletteId(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(bets).toEqual([]);
		expect(findByIdSpy).toHaveBeenCalledWith(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		);
		expect(findByIdSpy).toHaveBeenCalledTimes(1);
		expect(redis.smembers).toHaveBeenCalledWith(
			'ROULETTE:BET:ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(redis.smembers).toBeCalledTimes(1);
	});
});
