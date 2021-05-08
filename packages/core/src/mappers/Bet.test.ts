import BetMapper from './Bet';
import Bet from '../domain/BetEntity';
import Option from '../domain/OptionValueObject';

describe('Bet mapper', () => {
	it('toEntity', () => {
		const entity = BetMapper.toEntity({
			amount: 1000,
			rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			selection: '1',
			userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		});
		expect(entity).toMatchSnapshot();
	});

	it('toEntity creating new ID', () => {
		const entity = BetMapper.toEntity({
			amount: 1000,
			rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			selection: '1',
			userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			id: ''
		});
		expect(entity.getId()).toBeTruthy();
	});

	it('toModel', () => {
		const option = new Option({
			selection: '1'
		});
		const bet = new Bet({
			amount: 100,
			option: option,
			rouletteId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			userId: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229',
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		});
		const model = BetMapper.toModel(bet);
		expect(model).toMatchSnapshot();
	});
});
