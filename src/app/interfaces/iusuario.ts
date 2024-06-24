export interface Usuario {
    user_id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    image?: string;
    password?: string;
    ind_baja?:boolean;
    is_Admin?:number;
  }
  