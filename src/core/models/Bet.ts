export interface BetRequestModel {
  id?: string;
  selection: string;
  rouletteId: string;
  userId: string;
  amount: number;
}

export interface BetResponseModel {
  id: string;
  selection: string;
  rouletteId: string;
  userId: string;
  amount: number;
}
