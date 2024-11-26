export interface IGetBrands {
  marcas: IMarca[];
}

export interface IMarca {
  id: number;
  name: string;
  activate: boolean;
  trabajador_id: number;
  image: null;
}
