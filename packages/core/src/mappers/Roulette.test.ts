import Roulette from '../domain/RouletteEntity';
import RouletteMapper from './Roulette';

describe('Roulette mapper', () => {
	it('toEntity', () => {
		const entity = RouletteMapper.toEntity({
			name: 'Royal 007',
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		});
		expect(entity).toMatchSnapshot();
	});

	it('toEntity creating new ID', () => {
		const entity = RouletteMapper.toEntity({
			name: 'Royal 007'
		});
		expect(entity.getId()).toBeTruthy();
	});

	it('toModel', () => {
		const roulette = new Roulette({
			name: 'Royal 007',
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98229'
		});
		const model = RouletteMapper.toModel(roulette);
		expect(model).toMatchSnapshot();
	});
});
