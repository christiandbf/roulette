/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redis } from 'ioredis';
import RepositoryRedis from './RepositoryRedis';
import { RouletteRepository } from '../Repository';
import Roulette from '../../entities/Roulette';

interface RouletteDTO {
  id: string;
  isOpen: boolean;
  name: string;
}

class RouletteRepositoryRedis extends RepositoryRedis<Roulette, RouletteDTO>
  implements RouletteRepository {
  constructor(redis: Redis) {
    super(redis);
  }

  create(entity: Roulette): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(entity: Roulette): Promise<void> {
    throw new Error('Method not implemented.');
  }

  find(): Promise<Roulette[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Roulette[]> {
    throw new Error('Method not implemented.');
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
