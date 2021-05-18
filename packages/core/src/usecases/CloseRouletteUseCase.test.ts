import CloseRouletteUseCase from './CloseRouletteUseCase';
import RepositoryManagerMock from '../repositories';
import Option from '../domain/OptionValueObject';
import Roulette from '../domain/RouletteEntity';
import Bet from '../domain/BetEntity';

jest.mock('../repositories');

describe('Execute close roulette use case', () => {
	const optionWinner = new Option({ selection: 'RED' });
	const optionLoser = new Option({ selection: 'BLACK' });
	const roulette = new Roulette({
		name: 'Royal',
		id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
		isOpen: true
	});
	const betWinner = new Bet({
		amount: 1000,
		option: optionWinner,
		rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
		userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98444',
		id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98228'
	});
	const betLoser = new Bet({
		amount: 1000,
		option: optionLoser,
		rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
		userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98444',
		id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
	});
	const randomOptionSpy = jest
		.spyOn(Option, 'getRandomOption')
		.mockReturnValue(optionWinner);

	it('Throw error if roulette does not exist', async () => {
		const repositoryMock = RepositoryManagerMock.getInstance();
		repositoryMock.roulette.findById = jest.fn().mockResolvedValue(null);

		const useCase = new CloseRouletteUseCase(repositoryMock);
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

	it('Should close roulette and return bet looser and winner', async () => {
		const repositoryMock = RepositoryManagerMock.getInstance();
		repositoryMock.roulette.findById = jest.fn().mockResolvedValue(roulette);
		repositoryMock.bet.findByRouletteId = jest
			.fn()
			.mockResolvedValue([betWinner, betLoser]);

		const useCase = new CloseRouletteUseCase(repositoryMock);

		const result = await useCase.execute(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);

		expect(result).toMatchInlineSnapshot(`
		Object {
		  "betLosers": Array [
		    Object {
		      "amount": 1000,
		      "id": "ff6960b0-b015-11eb-8b4e-bd5c14d98229",
		      "rouletteId": "ff6960b0-b015-11eb-8b4e-bd5c14d98227",
		      "selection": "BLACK",
		      "userId": "ff6960b0-b015-11eb-8b4e-bd5c14d98444",
		    },
		  ],
		  "betWinners": Array [
		    Object {
		      "amount": 1000,
		      "id": "ff6960b0-b015-11eb-8b4e-bd5c14d98228",
		      "rouletteId": "ff6960b0-b015-11eb-8b4e-bd5c14d98227",
		      "selection": "RED",
		      "userId": "ff6960b0-b015-11eb-8b4e-bd5c14d98444",
		    },
		  ],
		  "result": "RED",
		  "roulette": Object {
		    "id": "ff6960b0-b015-11eb-8b4e-bd5c14d98227",
		    "isOpen": false,
		    "name": "Royal",
		  },
		}
	`);

		expect(repositoryMock.roulette.findById).toHaveBeenCalledTimes(1);
		expect(repositoryMock.roulette.findById).toHaveBeenCalledWith(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(repositoryMock.bet.findByRouletteId).toHaveBeenCalledTimes(1);
		expect(repositoryMock.bet.findByRouletteId).toHaveBeenCalledWith(
			'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		);
		expect(randomOptionSpy).toHaveBeenCalledTimes(1);
		expect(repositoryMock.roulette.update).toHaveBeenCalledWith({
			MIN_CHARACTERS: 2,
			UUID_REGEXP: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
			isOpen: false,
			name: 'Royal',
			props: {
				id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
				isOpen: true,
				name: 'Royal'
			}
		});
		expect(repositoryMock.roulette.update).toHaveBeenCalledTimes(1);
	});
});
