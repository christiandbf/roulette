import Writable from './Writable';
import Readable from './Readable';
import Roulette from '../entities/Roulette';
import Bet from '../entities/Bet';

export interface RouletteRepository
  extends Writable<Roulette>,
    Readable<Roulette> {}

export interface BetRepository extends Writable<Bet>, Readable<Bet> {}

export default interface Repository {
  roulette: RouletteRepository;
  bet: BetRepository;
}
