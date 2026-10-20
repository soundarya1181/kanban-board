export type Column = {
  id: string;
  name: string;
};

export type Card = {
  id: string;
  title: string;
  details: string;
  columnId: string;
};

export type BoardState = {
  columns: Column[];
  cards: Card[];
};
