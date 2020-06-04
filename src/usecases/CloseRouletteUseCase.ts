import { strict as assert } from 'assert';
import UseCase from './UseCase';
import RepositoryManager from '../repositories';
import Repository from '../repositories/Repository';
import Bet from '../domain/BetEntity';
import Option from '../domain/OptionValueObject';
import Roulette from '../domain/RouletteEntity';

interface RouletteRequestDTO {
  id: string;
}

interface RouletteResponseDTO {
  result: string;
  betWinners: Array<string>;
  betLlossers: Array<string>;
}

class CloseRouletteUseCase
  implements UseCase<RouletteRequestDTO, RouletteResponseDTO> {
  private readonly repository: Repository;

  constructor() {
    this.repository = RepositoryManager.getInstance();
  }

  async execute(request: RouletteRequestDTO): Promise<RouletteResponseDTO> {
    const roulette: Roulette | null = await this.repository.roulette.findById(
      request.id
    );
    assert.ok(roulette, 'Roulette does not exist');
    roulette.close();
    const bets: Array<Bet> = await this.repository.bet.findByRouletteId(
      request.id
    );
    const rouletteResult: Option = Option.getRandomOption();
    const betWinners: Array<Bet> = bets.filter((bet: Bet): boolean =>
      bet.getOption().equals(rouletteResult)
    );
    const betLlossers: Array<Bet> = bets.filter(
      (bet: Bet): boolean => !bet.getOption().equals(rouletteResult)
    );
    await this.repository.roulette.update(roulette);

    return {
      result: rouletteResult.value,
      betWinners: betWinners.map((bet: Bet): string => bet.getId()),
      betLlossers: betLlossers.map((bet: Bet): string => bet.getId())
    };
  }
}

export default CloseRouletteUseCase;
