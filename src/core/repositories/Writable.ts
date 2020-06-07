interface Writable<Entity> {
  create(entity: Entity): Promise<void>;
  update(entity: Entity): Promise<void>;
}

export default Writable;
