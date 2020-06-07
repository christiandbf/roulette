import UseCase from './UseCase';
import Roulette from '../domain/RouletteEntity';
import { RouletteResponseModel } from '../models/Roulette';

class ListRouletteUseCase extends UseCase<{}, RouletteResponseModel[]> {
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(request: {}): Promise<RouletteResponseModel[]> {
    const roulettes: Roulette[] = await this.repository.roulette.find();
    const roletteResponseModels: RouletteResponseModel[] = roulettes.map(
      (roulette: Roulette): RouletteResponseModel => ({
        id: roulette.getId(),
        isOpen: roulette.getIsOpen(),
        name: roulette.getName()
      })
    );

    return roletteResponseModels;
  }
}

export default ListRouletteUseCase;
