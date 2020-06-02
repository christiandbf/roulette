import { Redis } from 'ioredis';

abstract class RepositoryRedis<Entity, EntityDTO> {
  private static readonly BASE_NAMESPACE = 'ROULETTE';

  private readonly redis: Redis;

  constructor(redis: Redis) {
    this.redis = redis;
  }

  protected abstract toDomain(entityDTO: EntityDTO): Entity;
  protected abstract toPersistence(entity: Entity): EntityDTO;
}

export default RepositoryRedis;
