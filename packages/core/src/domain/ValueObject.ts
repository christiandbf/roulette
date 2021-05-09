import { shallowEqual } from 'shallow-equal-object';

abstract class ValueObject<Props, Value> {
	protected readonly props: Props;
	public readonly value: Value;

	constructor(props: Props, value: Value) {
		this.props = Object.freeze(props);
		this.value = value;
	}

	public getProps(): Props {
		return this.props;
	}

	public equals(vo: ValueObject<Props, Value>): boolean {
		return (
			shallowEqual(this.props, vo.props) && shallowEqual(this.value, vo.value)
		);
	}
}

export default ValueObject;
