import Writable from './Writable';
import Readable from './Readable';
import Roulette from '../domain/RouletteEntity';
import Bet from '../domain/BetEntity';

export interface RouletteRepository
  extends Writable<Roulette>,
    Readable<Roulette> {}

export interface BetRepository extends Writable<Bet>, Readable<Bet> {
  findByRouletteId(id: string): Promise<Bet[]>;
}

export default interface Repository {
  roulette: RouletteRepository;
  bet: BetRepository;
}
