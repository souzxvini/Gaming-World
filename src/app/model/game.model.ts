import { Categoria } from 'src/app/model/categoria.model';
export class Game{
  id!: number;
  nome!: string;
  descricao!: string;
  anoLancamento!: string;
  empresa!: string;
  preco!: number;
  nomeCategoria: string;
  urlImagem: string;
  categoria: Categoria;
  file: File
}
