import Mapper from './Mapper';
import Bet from '../domain/BetEntity';
import Option from '../domain/OptionValueObject';
import { BetRequestModel, BetResponseModel } from '../models/Bet';

const BetMapper: Mapper<Bet, BetRequestModel, BetResponseModel> = {
	toEntity: (request: BetRequestModel): Bet => {
		const option: Option = new Option({ selection: request.selection });
		return new Bet({
			option,
			amount: request.amount,
			rouletteId: request.rouletteId,
			userId: request.userId,
			id: request.id || undefined
		});
	},
	toModel: (bet: Bet): BetResponseModel => ({
		id: bet.getId(),
		rouletteId: bet.getRouletteId(),
		amount: bet.getAmount(),
		selection: bet.getOption().value,
		userId: bet.getUserId()
	})
};

export default BetMapper;
