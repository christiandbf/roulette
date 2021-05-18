import CreateRouletteUseCase from './CreateRouletteUseCase';
import RepositoryManagerMock from '../repositories';

jest.mock('../repositories');
jest.mock('uuid', () => ({
	v1: jest.fn().mockReturnValue('34b9c010-b774-11eb-8815-3525407f7666')
}));

test('Execute create roulette use case', async () => {
	const repositoryMock = RepositoryManagerMock.getInstance();
	repositoryMock.roulette.create = jest.fn();

	const useCase = new CreateRouletteUseCase(repositoryMock);
	const response = await useCase.execute({
		name: 'Royal'
	});

	expect(response).toMatchInlineSnapshot(`
		Object {
		  "id": "34b9c010-b774-11eb-8815-3525407f7666",
		  "isOpen": false,
		  "name": "Royal",
		}
	`);
	expect(repositoryMock.roulette.create).toHaveBeenCalledWith(
		expect.objectContaining({
			id: '34b9c010-b774-11eb-8815-3525407f7666',
			isOpen: false,
			name: 'Royal'
		})
	);
	expect(repositoryMock.roulette.create).toHaveBeenCalledTimes(1);
});
