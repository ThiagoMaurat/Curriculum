export type Card = {
  id: string;
  title: string;
  description: string | null;
};

export type List = {
  id: string;
  title: string;
};

export type Board = {
  id: string;
  title: string;
};

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List };
