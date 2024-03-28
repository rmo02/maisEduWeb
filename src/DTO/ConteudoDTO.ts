import { AulaDTO } from "./AulaDTO";
import { DisciplinaDTO } from "./DisciplinasDTO";

export type ConteudoDTO = {
  array_conteudos: AulaDTO[];
  created_by: string;
  disciplina: DisciplinaDTO;
  first_aula: {
    id: string;
    title: string;
    file: string;
    progress: number;
    favorite: boolean;
  };
  id: string;
  id_bimestre: string;
  id_disciplina: string;
  id_serie: string;
  name: string;
  professor: string;
  status: boolean;
  updated_at: string;
};

export type ConteudosDTO = {
  conteudo: ConteudoDTO;
};
