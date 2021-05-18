import CreateBetUseCase from './CreateBetUseCase';
import RepositoryManagerMock from '../repositories';
import Roulette from '../domain/RouletteEntity';

jest.mock('../repositories');
jest.mock('uuid', () => ({
	v1: jest.fn().mockReturnValue('34b9c010-b774-11eb-8815-3525407f7666')
}));

describe('Execute create bet use case', () => {
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

	it('Throw error if roulette does not exist', async () => {
		const repositoryMock = RepositoryManagerMock.getInstance();
		repositoryMock.roulette.findById = jest.fn().mockResolvedValue(null);

		const useCase = new CreateBetUseCase(repositoryMock);
		try {
			await useCase.execute({
				selection: 'RED',
				rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
				userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98330',
				amount: 100
			});
			fail('it should not reach here');
		} catch (error) {
			expect(error.message).toBe('Roulette does not exist');
			expect(repositoryMock.roulette.findById).toHaveBeenCalledTimes(1);
			expect(repositoryMock.roulette.findById).toHaveBeenCalledWith(
				'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
			);
		}
	});

	it('Throw error if roulette is not open', async () => {
		const repositoryMock = RepositoryManagerMock.getInstance();
		repositoryMock.roulette.findById = jest
			.fn()
			.mockResolvedValue(rouletteClosed);

		const useCase = new CreateBetUseCase(repositoryMock);
		try {
			await useCase.execute({
				selection: 'RED',
				rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
				userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98330',
				amount: 100
			});
			fail('it should not reach here');
		} catch (error) {
			expect(error.message).toBe('Roulette is not open');
			expect(repositoryMock.roulette.findById).toHaveBeenCalledTimes(1);
			expect(repositoryMock.roulette.findById).toHaveBeenCalledWith(
				'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
			);
		}
	});

	it('Create bet', async () => {
		const repositoryMock = RepositoryManagerMock.getInstance();
		repositoryMock.roulette.findById = jest
			.fn()
			.mockResolvedValue(rouletteOpen);
		repositoryMock.bet.create = jest.fn();

		const useCase = new CreateBetUseCase(repositoryMock);
		const response = await useCase.execute({
			selection: 'RED',
			rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
			userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98330',
			amount: 100
		});

		expect(response).toMatchInlineSnapshot(`
		Object {
		  "amount": 100,
		  "id": "34b9c010-b774-11eb-8815-3525407f7666",
		  "rouletteId": "ff6960b0-b015-11eb-8b4e-bd5c14d98227",
		  "selection": "RED",
		  "userId": "ff6960b0-b015-11eb-8b4e-bd5c14d98330",
		}
	`);
		expect(repositoryMock.roulette.findById).toHaveBeenCalledTimes(1);
		expect(repositoryMock.roulette.findById).toHaveBeenCalledWith(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(repositoryMock.bet.create).toHaveBeenCalledWith(
			expect.objectContaining({
				amount: 100,
				id: '34b9c010-b774-11eb-8815-3525407f7666',
				option: {
					SELECTION_REGEX: /^([1-9]|[12]\d|3[0-6])$|^(BLACK|RED)$/i,
					props: { selection: 'RED' },
					value: 'RED'
				},
				rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
				userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98330'
			})
		);
		expect(repositoryMock.bet.create).toHaveBeenCalledTimes(1);
	});
});
