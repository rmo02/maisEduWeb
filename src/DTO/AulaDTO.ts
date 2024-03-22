export type VideoAulaDTO = {
  created_at: string;
  favorite: boolean;
  file: string;
  hash: string;
  id: string;
  id_disciplina: string;
  id_serie: string;
  progress: number;
  rating: number | null;
  thumb: string;
  time: string;
  title: string;
  updated_at: string;
};

export type AtividadeDTO = {
  created_at: string;
  grade: number;
  id: string;
  id_disciplina: string;
  id_serie: string;
  thumb: string;
  title: string;
  updated_at: string;
};

export type AulaDTO = {
  aula: VideoAulaDTO;

  atividade: AtividadeDTO;
};
