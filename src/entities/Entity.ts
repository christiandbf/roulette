import { strict as assert } from 'assert';
import { v1 as uuid } from 'uuid';

export default abstract class Entity<Props> {
  protected readonly UUID_REGEXP: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  protected readonly id: string;
  protected props: Props;

  constructor(props: Props, id?: string) {
    assert.ok(
      id === undefined || this.UUID_REGEXP.test(id),
      'ID is not a valid UUID'
    );
    this.props = props;
    this.id = id ? id : uuid();
  }

  public getId(): string {
    return this.id;
  }
}
