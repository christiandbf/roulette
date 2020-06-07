import UseCase from './UseCase';
import Roulette from '../domain/RouletteEntity';
import {
  RouletteRequestModel,
  RouletteResponseModel
} from '../models/Roulette';

class CreateRouletteUseCase extends UseCase<
  RouletteRequestModel,
  RouletteResponseModel
> {
  constructor() {
    super();
  }

  async execute(request: RouletteRequestModel): Promise<RouletteResponseModel> {
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
