import OptionValueObject from './OptionValueObject';

describe('OptionValueObject', () => {
	const ramdonSpy = jest.spyOn(Math, 'random');

	it('GetRandomColorOption', () => {
		const option: OptionValueObject = OptionValueObject.getRandomColorOption();
		expect(option.value).toMatch(/^(BLACK|RED)$/);
	});

	it('getRandomNumberOption', () => {
		const option: OptionValueObject = OptionValueObject.getRandomNumberOption();
		expect(option.value).toMatch(/^([1-9]|[12]\d|3[0-6])$/);
	});

	it('getRandomOption color', () => {
		ramdonSpy.mockReturnValue(0.1);
		const option: OptionValueObject = OptionValueObject.getRandomOption();
		expect(option.value).toMatch(/^(BLACK|RED)$/i);
	});

	it('getRandomOption color', () => {
		ramdonSpy.mockReturnValue(0.6);
		const option: OptionValueObject = OptionValueObject.getRandomOption();
		expect(option.value).toMatch(/^([1-9]|[12]\d|3[0-6])$/i);
	});

	it('Should throw error if selection is not valid', () => {
		expect(() => new OptionValueObject({ selection: 'J' })).toThrowError(
			'Selection is not valid'
		);
	});

	it('Should instantiate if selection is valid', () => {
		expect(() => new OptionValueObject({ selection: '1' })).not.toThrowError(
			'Selection is not valid'
		);
	});
});
