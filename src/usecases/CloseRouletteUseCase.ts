import { strict as assert } from 'assert';
import UseCase from './UseCase';
import Bet from '../domain/BetEntity';
import Option from '../domain/OptionValueObject';
import Roulette from '../domain/RouletteEntity';

interface RequestModel {
  id: string;
}

interface ResponseModel {
  result: string;
  betWinners: Array<string>;
  betLlossers: Array<string>;
}

class CloseRouletteUseCase extends UseCase<RequestModel, ResponseModel> {
  constructor() {
    super();
  }

  async execute(request: RequestModel): Promise<ResponseModel> {
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
