import { strict as assert } from 'assert';
import UseCase from './UseCase';
import RepositoryManager from '../repositories';
import Repository from '../repositories/Repository';
import Roulette from '../domain/RouletteEntity';

interface RouletteRequestDTO {
  id: string;
}

interface RouletteResponseDTO {
  id: string;
  isOpen: boolean;
  name: string;
}

class OpenRouletteUseCase
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
