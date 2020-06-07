import { strict as assert } from 'assert';
import UseCase from './UseCase';
import Bet from '../domain/BetEntity';
import Option from '../domain/OptionValueObject';
import Roulette from '../domain/RouletteEntity';
import { BetRequestModel, BetResponseModel } from '../models/Bet';

class CreateBetUseCase extends UseCase<BetRequestModel, BetResponseModel> {
  constructor() {
    super();
  }

  async execute(request: BetRequestModel): Promise<BetResponseModel> {
    const roulette: Roulette | null = await this.repository.roulette.findById(
      request.rouletteId
    );
    assert.ok(roulette, 'Roulette does not exist');
    assert.ok(roulette.getIsOpen(), 'Roulette is not open');
    const option: Option = new Option({ selection: request.selection });
    const bet: Bet = new Bet({
      option,
      amount: request.amount,
      rouletteId: request.rouletteId,
      userId: request.userId
    });
    await this.repository.bet.create(bet);

    return {
      id: bet.getId(),
      rouletteId: bet.getrouletteId(),
      amount: bet.getAmount(),
      selection: bet.getOption().value,
      userId: bet.getUserId()
    };
  }
}

export default CreateBetUseCase;
