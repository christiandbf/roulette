import { strict as assert } from 'assert';
import UseCase from './UseCase';
import Roulette from '../domain/RouletteEntity';

interface RequestModel {
  id: string;
}

interface ResponseModel {
  id: string;
  isOpen: boolean;
  name: string;
}

class OpenRouletteUseCase extends UseCase<RequestModel, ResponseModel> {
  constructor() {
    super();
  }

  async execute(request: RequestModel): Promise<ResponseModel> {
    const roulette: Roulette | null = await this.repository.roulette.findById(
      request.id
    );
    assert.ok(roulette, 'Roulette does not exist');
    roulette.open();
    this.repository.roulette.update(roulette);

    return {
      id: roulette.getId(),
      isOpen: roulette.getIsOpen(),
      name: roulette.getName()
    };
  }
}

export default OpenRouletteUseCase;
