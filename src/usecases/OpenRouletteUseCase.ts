import { strict as assert } from 'assert';
import UseCase from './UseCase';
import Roulette from '../domain/RouletteEntity';
import { RouletteResponseModel } from '../models/Roulette';

class OpenRouletteUseCase extends UseCase<string, RouletteResponseModel> {
  constructor() {
    super();
  }

  async execute(id: string): Promise<RouletteResponseModel> {
    const roulette: Roulette | null = await this.repository.roulette.findById(
      id
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
