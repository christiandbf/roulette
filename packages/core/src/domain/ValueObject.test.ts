import ValueObject from './ValueObject';

class Test extends ValueObject<{ a: number }, number> {}

describe('ValueObject', () => {
	it('Should instantiate value object correctly', () => {
		const valueObject = new Test({ a: 1 }, 1);
		expect(valueObject.getProps()).toEqual({
			a: 1
		});
		expect(valueObject.value).toEqual(1);
	});

	it('Should return true if value objects equal', () => {
		const valueObject1 = new Test({ a: 1 }, 1);
		const valueObject2 = new Test({ a: 1 }, 1);
		expect(valueObject1.equals(valueObject2)).toBeTruthy();
	});

	it('Should return false if value objects different', () => {
		const valueObject1 = new Test({ a: 1 }, 1);
		const valueObject2 = new Test({ a: 2 }, 2);
		expect(valueObject1.equals(valueObject2)).toBeFalsy();
	});
});
