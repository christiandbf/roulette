import RouletteEntity from './RouletteEntity';

describe('RouletteEntity', () => {
	it('Should instantiate entity correctly', () => {
		const roulette = new RouletteEntity({
			name: 'royal a007',
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		});
		expect(roulette.getName()).toBe('Royal A007');
		expect(roulette.getIsOpen()).toBe(false);
	});

	it('Should throw error if name is not valid', () => {
		expect(() => {
			new RouletteEntity({
				name: 'r',
				id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
			});
		}).toThrowError('Name is not valid');
	});

	it('Should open roulette', () => {
		const roulette = new RouletteEntity({
			name: 'royal a007',
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227'
		});
		roulette.open();
		expect(roulette.getIsOpen()).toBe(true);
	});

	it('Should throw error if roulette is already open', () => {
		expect(() => {
			const roulette = new RouletteEntity({
				name: 'royal a007',
				id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
				isOpen: true
			});
			roulette.open();
		}).toThrow('This Roulette is already open');
	});

	it('Should close roulette', () => {
		const roulette = new RouletteEntity({
			name: 'royal a007',
			id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
			isOpen: true
		});
		roulette.close();
		expect(roulette.getIsOpen()).toBe(false);
	});

	it('Should throw error if roulette is already closed', () => {
		expect(() => {
			const roulette = new RouletteEntity({
				name: 'royal a007',
				id: 'ff6960b0-b015-11eb-8b4e-bd5c14d98227',
				isOpen: false
			});
			roulette.close();
		}).toThrow('This Roulette is already closed');
	});
});
