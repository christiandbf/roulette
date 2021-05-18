import ListRouletteUseCase from './ListRouletteUseCase';
import RepositoryManagerMock from '../repositories';
import Roulette from '../domain/RouletteEntity';

jest.mock('../repositories');

test('List roulette use case', async () => {
	const rouletteOpen = new Roulette({
		name: 'Royal',
		id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
		isOpen: true
	});
	const rouletteClosed = new Roulette({
		name: 'Royal',
		id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98228',
		isOpen: false
	});
	const repositoryMock = RepositoryManagerMock.getInstance();
	repositoryMock.roulette.find = jest
		.fn()
		.mockResolvedValue([rouletteClosed, rouletteOpen]);

	const useCase = new ListRouletteUseCase(repositoryMock);
	const response = await useCase.execute();

	expect(response).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "id": "ff6960b0-b015-11eb-8b4e-bd5c14d98228",
		    "isOpen": false,
		    "name": "Royal",
		  },
		  Object {
		    "id": "ff6960b0-b015-11eb-8b4e-bd5c14d98227",
		    "isOpen": true,
		    "name": "Royal",
		  },
		]
	`);
	expect(repositoryMock.roulette.find).toHaveBeenCalledTimes(1);
});
