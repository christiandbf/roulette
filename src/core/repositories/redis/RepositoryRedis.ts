import { Redis } from 'ioredis';

abstract class RepositoryRedis<Entity, EntityDTO> {
	protected readonly BASE_NAMESPACE = 'ROULETTE';

	protected readonly redis: Redis;

	constructor(redis: Redis) {
		this.redis = redis;
	}

	protected abstract toDomain(entityDTO: EntityDTO): Entity;
	protected abstract toPersistence(entity: Entity): EntityDTO;
}

export default RepositoryRedis;
