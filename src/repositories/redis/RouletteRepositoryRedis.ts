import { strict as assert } from 'assert';
import { Redis } from 'ioredis';
import RepositoryRedis from './RepositoryRedis';
import { RouletteRepository } from '../Repository';
import Roulette from '../../domain/RouletteEntity';

interface RouletteDTO {
  id: string;
  isOpen: boolean;
  name: string;
}

class RouletteRepositoryRedis extends RepositoryRedis<Roulette, RouletteDTO>
  implements RouletteRepository {
  private readonly BASE_ROULETTE: string = `${this.BASE_NAMESPACE}:ROULETTE`;

  constructor(redis: Redis) {
    super(redis);
  }

  async create(roulette: Roulette): Promise<void> {
    assert.ok(roulette, 'Roulette object is not defined');
    const rouletteDTO: RouletteDTO = this.toPersistence(roulette);
    await this.redis.set(
      `${this.BASE_ROULETTE}:${rouletteDTO.id}`,
      JSON.stringify(rouletteDTO)
    );
    await this.redis.sadd(this.BASE_ROULETTE, rouletteDTO.id);
  }

  async update(roulette: Roulette): Promise<void> {
    await this.create(roulette);
  }

  async find(): Promise<Roulette[]> {
    const rouletteIds: Array<string> = await this.redis.smembers(
      this.BASE_ROULETTE
    );
    const roulettes: Array<Roulette | null> = await Promise.all(
      rouletteIds.map((id) => this.findById(id))
    );

    return roulettes.filter(
      (roulette): roulette is Roulette => roulette !== null
    );
  }

  async findById(id: string): Promise<Roulette | null> {
    assert.ok(id, 'ID is not defined');
    const serializedRoulette: string | null = await this.redis.get(
      `${this.BASE_ROULETTE}:${id}`
    );
    if (!serializedRoulette) return null;
    const rouletteDTO: RouletteDTO = JSON.parse(serializedRoulette);

    return this.toDomain(rouletteDTO);
  }

  protected toDomain(rouletteDTO: RouletteDTO): Roulette {
    return new Roulette({
      id: rouletteDTO.id,
      isOpen: rouletteDTO.isOpen,
      name: rouletteDTO.name
    });
  }

  protected toPersistence(roulette: Roulette): RouletteDTO {
    return {
      id: roulette.getId(),
      isOpen: roulette.getIsOpen(),
      name: roulette.getName()
    };
  }
}

export default RouletteRepositoryRedis;
