/* eslint-disable @typescript-eslint/no-unused-vars */
import { Redis } from 'ioredis';
import RepositoryRedis from './RepositoryRedis';
import { BetRepository } from '../Repository';
import Bet from '../../entities/Bet';

interface BetDTO {
  id: string;
  rouletteId: string;
  userId: string;
  amount: number;
}

class BetRepositoryRedis extends RepositoryRedis<Bet, BetDTO>
  implements BetRepository {
  constructor(redis: Redis) {
    super(redis);
  }

  create(entity: Bet): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(entity: Bet): Promise<void> {
    throw new Error('Method not implemented.');
  }

  find(): Promise<Bet[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<Bet[]> {
    throw new Error('Method not implemented.');
  }

  protected toDomain(betDTO: BetDTO): Bet {
    return new Bet({
      id: betDTO.id,
      rouletteId: betDTO.rouletteId,
      userId: betDTO.userId,
      amount: betDTO.amount
    });
  }

  protected toPersistence(bet: Bet): BetDTO {
    return {
      id: bet.getId(),
      rouletteId: bet.getrouletteId(),
      userId: bet.getUserId(),
      amount: bet.getAmount()
    };
  }
}

export default BetRepositoryRedis;
