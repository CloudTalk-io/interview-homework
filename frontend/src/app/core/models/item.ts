export interface Item {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
  editing?: any;
}

export interface CreateItemDto {
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string;
}
