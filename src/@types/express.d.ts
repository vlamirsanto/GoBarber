/**
 * Necessário para declarar uma tipagem dentro de uma biblioteca importada e utilizada
 */
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
