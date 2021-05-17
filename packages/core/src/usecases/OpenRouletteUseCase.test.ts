import OpenRouletteUseCase from './OpenRouletteUseCase';
import RepositoryManagerMock from '../repositories';
import Notification, {
	NotificationProtocol
} from '../services/NotificationManager';
import Roulette from '../domain/RouletteEntity';

jest.mock('../repositories');

describe('Execute open roulette use case', () => {
	const notifyRouletteOpenSpy = jest.fn();
	const getInstanceSpy = jest
		.spyOn(Notification, 'getInstance')
		.mockReturnValue({ notifyRouletteOpen: notifyRouletteOpenSpy });

	it('Throw error if roulette does not exist', async () => {
		const repositoryMock = RepositoryManagerMock.getInstance();
		repositoryMock.roulette.findById = jest.fn().mockResolvedValue(null);
		const useCase = new OpenRouletteUseCase(repositoryMock);

		try {
			await useCase.execute('ff6960b0-b015-11eb-8b4e-bd5c14d98227');
			fail('it should not reach here');
		} catch (error) {
			expect(error.message).toBe('Roulette does not exist');
			expect(repositoryMock.roulette.findById).toHaveBeenCalledTimes(1);
			expect(repositoryMock.roulette.findById).toHaveBeenCalledWith(
				'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
			);
		}
	});

	it('Should open roulette', async () => {
		const roulette = new Roulette({
			name: 'Royal',
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
			isOpen: false
		});
		const repositoryMock = RepositoryManagerMock.getInstance();
		repositoryMock.roulette.findById = jest.fn().mockResolvedValue(roulette);

		const useCase = new OpenRouletteUseCase(repositoryMock);

		const result = await useCase.execute(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(result).toMatchInlineSnapshot(`
		Object {
		  "id": "ff6960b0-b015-11eb-8b4e-bd5c14d98227",
		  "isOpen": true,
		  "name": "Royal",
		}
	`);
		expect(repositoryMock.roulette.update).toHaveBeenCalledWith(roulette);
		expect(repositoryMock.roulette.update).toHaveBeenCalledTimes(1);
		expect(getInstanceSpy).toHaveBeenCalledWith({
			protocol: NotificationProtocol.SNS
		});
		expect(getInstanceSpy).toHaveBeenCalledTimes(1);
		expect(notifyRouletteOpenSpy).toHaveBeenCalledWith(roulette);
		expect(notifyRouletteOpenSpy).toHaveBeenCalledTimes(1);
	});
});
