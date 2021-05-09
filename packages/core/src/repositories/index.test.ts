import RepositoryManager from './index';
import redisRepositoryFactoryMock from './redis';

jest.mock('./redis', () => {
	return jest.fn().mockReturnValue({
		roulette: {},
		bet: {}
	});
});

test('Should return repository singleton', () => {
	const repository1 = RepositoryManager.getInstance();
	expect(repository1).toEqual({
		roulette: {},
		bet: {}
	});
	const repository2 = RepositoryManager.getInstance();
	expect(repository2).toEqual({
		roulette: {},
		bet: {}
	});
	expect(repository1).toBe(repository2);
	expect(redisRepositoryFactoryMock).toHaveBeenCalledTimes(1);
});
