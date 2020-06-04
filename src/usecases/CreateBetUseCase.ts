import { strict as assert } from 'assert';
import UseCase from './UseCase';
import RepositoryManager from '../repositories';
import Repository from '../repositories/Repository';
import Bet from '../domain/BetEntity';
import Option from '../domain/OptionValueObject';
import Roulette from '../domain/RouletteEntity';

interface BetRequestDTO {
  selection: string;
  rouletteId: string;
  userId: string;
  amount: number;
}

interface BetResponseDTO {
  id: string;
  selection: string;
  rouletteId: string;
  userId: string;
  amount: number;
}

class CreateBetUseCase implements UseCase<BetRequestDTO, BetResponseDTO> {
  private readonly repository: Repository;

  constructor() {
    this.repository = RepositoryManager.getInstance();
  }

  async execute(request: BetRequestDTO): Promise<BetResponseDTO> {
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
