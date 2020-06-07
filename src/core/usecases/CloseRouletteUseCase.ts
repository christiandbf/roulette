import { strict as assert } from 'assert';
import UseCase from './UseCase';
import Bet from '../domain/BetEntity';
import Option from '../domain/OptionValueObject';
import Roulette from '../domain/RouletteEntity';
import { GameResponseModel } from '../models/Game';
import { BetResponseModel } from '../models/Bet';
import RouletteMapper from '../mappers/Roulette';
import BetMapper from '../mappers/Bet';

class CloseRouletteUseCase extends UseCase<string, GameResponseModel> {
  constructor() {
    super();
  }

  async execute(id: string): Promise<GameResponseModel> {
    const roulette: Roulette | null = await this.repository.roulette.findById(
      id
    );
    assert.ok(roulette, 'Roulette does not exist');
    roulette.close();
    const bets: Array<Bet> = await this.repository.bet.findByRouletteId(id);
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
      roulette: RouletteMapper.toModel(roulette),
      betWinners: betWinners.map(
        (bet: Bet): BetResponseModel => BetMapper.toModel(bet)
      ),
      betLosers: betLlossers.map(
        (bet: Bet): BetResponseModel => BetMapper.toModel(bet)
      )
    };
  }
}

export default CloseRouletteUseCase;
