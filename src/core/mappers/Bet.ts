import Mapper from './Mapper';
import Bet from '../domain/BetEntity';
import Option from '../domain/OptionValueObject';
import { BetRequestModel, BetResponseModel } from '../models/Bet';

const BetMapper: Mapper<Bet, BetRequestModel, BetResponseModel> = {
  toEntity: (request: BetRequestModel): Bet => {
    const option: Option = new Option({ selection: request.selection });
    const bet: Bet = new Bet({
      option,
      amount: request.amount,
      rouletteId: request.rouletteId,
      userId: request.userId
    });
    return bet;
  },
  toModel: (bet: Bet): BetResponseModel => ({
    id: bet.getId(),
    rouletteId: bet.getrouletteId(),
    amount: bet.getAmount(),
    selection: bet.getOption().value,
    userId: bet.getUserId()
  })
};

export default BetMapper;
