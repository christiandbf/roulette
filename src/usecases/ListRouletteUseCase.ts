import UseCase from './UseCase';
import Roulette from '../domain/RouletteEntity';

interface ResponseModel {
  id: string;
  isOpen: boolean;
  name: string;
}

class ListRouletteUseCase extends UseCase<{}, ResponseModel[]> {
  constructor() {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(request: {}): Promise<ResponseModel[]> {
    const roulettes: Roulette[] = await this.repository.roulette.find();
    const rouletteDTOs: ResponseModel[] = roulettes.map(
      (roulette: Roulette): ResponseModel => ({
        id: roulette.getId(),
        isOpen: roulette.getIsOpen(),
        name: roulette.getName()
      })
    );

    return rouletteDTOs;
  }
}

export default ListRouletteUseCase;
