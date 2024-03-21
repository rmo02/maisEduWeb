export type AulaDTO = {
  aula: {
    created_at: string;
    favorite: boolean;
    file: string;
    hash: string;
    id: string;
    id_disciplina: string;
    id_serie: string;
    progress: number;
    rating: null | any; // Ajuste conforme necessário
    thumb: string;
    time: string;
    title: string;
    updated_at: string;
  };
  atividade: {
    created_at: string;
    grade: number;
    id: string;
    id_disciplina: string;
    id_serie: string;
    thumb: string;
    title: string;
    updated_at: string;
  };
};
