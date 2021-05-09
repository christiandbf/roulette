import Entity from './Entity';

interface Props {
	a: number;
}

class Test extends Entity<Props> {
	public getProps(): Props {
		return this.props;
	}
	public isIDaUUID(): boolean {
		return this.UUID_REGEXP.test(this.id);
	}
}

describe('Entity', () => {
	it('Should instantiate entity without ID correctly', () => {
		const entity = new Test({ a: 1 }, undefined);
		expect(entity.getId()).toBeTruthy();
		expect(entity.getProps()).toEqual({ a: 1 });
	});

	it('Should instantiate entity with ID correctly', () => {
		const entity = new Test({ a: 1 }, 'ff6960b0-b015-11eb-8b4e-bd5c14d98229');
		expect(entity.getId()).toBe('ff6960b0-b015-11eb-8b4e-bd5c14d98229');
		expect(entity.getProps()).toEqual({ a: 1 });
		expect(entity.isIDaUUID()).toBeTruthy();
	});

	it('Should throw error if ID is not a UUID', () => {
		expect(() => new Test({ a: 1 }, 'ff6960b0-b015-11eb-8b4e')).toThrow(
			'ID is not a valid UUID'
		);
	});
});
