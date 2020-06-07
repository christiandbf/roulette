import UseCase from './UseCase';
import Roulette from '../domain/RouletteEntity';

interface RequestModel {
  name: string;
}

interface ResponseModel {
  id: string;
  isOpen: boolean;
  name: string;
}

class CreateRouletteUseCase extends UseCase<RequestModel, ResponseModel> {
  constructor() {
    super();
  }

  async execute(request: RequestModel): Promise<ResponseModel> {
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
