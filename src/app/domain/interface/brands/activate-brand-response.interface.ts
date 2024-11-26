export interface IActivateBrand {
  brand: IBrand;
}

export interface IBrand {
  id: number;
  name: string;
  activate: boolean;
  trabajador_id: number;
  image: null;
}
