import BetEntity from './BetEntity';
import Option from './OptionValueObject';

describe('BetEntity', () => {
	it('Should instantiate entity correctly', () => {
		const option: Option = new Option({ selection: '1' });
		const bet = new BetEntity({
			amount: 1000,
			option,
			rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
			userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98228',
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		});
		expect(bet.getRouletteId()).toBe('ff6960b0-b015-11eb-8b4e-bd5c14d98227');
		expect(bet.getUserId()).toBe('ff6960b0-b015-11eb-8b4e-bd5c14d98228');
		expect(bet.getAmount()).toBe(1000);
		expect(bet.getOption().equals(option)).toBeTruthy();
	});

	it('Should return error if amount is greater than MAX_AMOUNT', () => {
		expect(() => {
			const option: Option = new Option({ selection: '1' });
			new BetEntity({
				amount: 100000,
				option,
				rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
				userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98228',
				id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
			});
		}).toThrowError('Maximum bet amount exceeded');
	});

	it('Should return error if roulette ID is not valid', () => {
		expect(() => {
			const option: Option = new Option({ selection: '1' });
			new BetEntity({
				amount: 1000,
				option,
				rouletteId: 'ff6960b0-b015-11eb-8b4e',
				userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98228',
				id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
			});
		}).toThrowError('Roulette ID is not a valid UUID');
	});

	it('Should return error if user ID is not valid', () => {
		expect(() => {
			const option: Option = new Option({ selection: '1' });
			new BetEntity({
				amount: 1000,
				option,
				rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98228',
				userId: 'ff6960b0-b015-11eb-8b4e',
				id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
			});
		}).toThrowError('User ID is not a valid UUID');
	});
});
