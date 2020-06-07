import Mapper from './Mapper';
import Roulette from '../domain/RouletteEntity';
import {
  RouletteRequestModel,
  RouletteResponseModel
} from '../models/Roulette';

const RouletteMapper: Mapper<
  Roulette,
  RouletteRequestModel,
  RouletteResponseModel
> = {
  toEntity: (request: RouletteRequestModel): Roulette => {
    return new Roulette({ name: request.name });
  },
  toModel: (roulette: Roulette): RouletteResponseModel => ({
    id: roulette.getId(),
    isOpen: roulette.getIsOpen(),
    name: roulette.getName()
  })
};

export default RouletteMapper;
