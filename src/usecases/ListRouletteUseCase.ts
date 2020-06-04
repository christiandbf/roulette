import UseCase from './UseCase';
import RepositoryManager from '../repositories';
import Repository from '../repositories/Repository';
import Roulette from '../domain/RouletteEntity';

interface RouletteResponseDTO {
  id: string;
  isOpen: boolean;
  name: string;
}

class ListRouletteUseCase implements UseCase<{}, RouletteResponseDTO[]> {
  private readonly repository: Repository;

  constructor() {
    this.repository = RepositoryManager.getInstance();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(request: {}): Promise<RouletteResponseDTO[]> {
    const roulettes: Roulette[] = await this.repository.roulette.find();
    const rouletteDTOs: RouletteResponseDTO[] = roulettes.map(
      (roulette: Roulette): RouletteResponseDTO => ({
        id: roulette.getId(),
        isOpen: roulette.getIsOpen(),
        name: roulette.getName()
      })
    );

    return rouletteDTOs;
  }
}

export default ListRouletteUseCase;
