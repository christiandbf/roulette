import UseCase from './UseCase';
import RepositoryManager from '../repositories';
import Repository from '../repositories/Repository';
import Roulette from '../entities/Roulette';

interface RouletteRequestDTO {
  name: string;
}

interface RouletteResponseDTO {
  id: string;
  isOpen: boolean;
  name: string;
}

class CreateRouletteUseCase
  implements UseCase<RouletteRequestDTO, RouletteResponseDTO> {
  private readonly repository: Repository;

  constructor() {
    this.repository = RepositoryManager.getInstance();
  }

  async execute(request: RouletteRequestDTO): Promise<RouletteResponseDTO> {
    const roulette = new Roulette({ name: request.name });
    await this.repository.roulette.create(roulette);

    return {
      id: roulette.getId(),
      isOpen: roulette.getIsOpen(),
      name: roulette.getName()
    };
  }
}

export default CreateRouletteUseCase;
