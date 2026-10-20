import type { BoardState, Card } from "./types";

export function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function cardsInColumn(state: BoardState, columnId: string): Card[] {
  return state.cards.filter((card) => card.columnId === columnId);
}

export function addCard(
  state: BoardState,
  input: { columnId: string; title: string; details?: string; id?: string },
): BoardState {
  const title = input.title.trim();
  if (!title) {
    throw new Error("Card title is required");
  }

  const column = state.columns.find((item) => item.id === input.columnId);
  if (!column) {
    throw new Error("Unknown column");
  }

  const card: Card = {
    id: input.id ?? createId(),
    title,
    details: (input.details ?? "").trim(),
    columnId: input.columnId,
  };

  return { ...state, cards: [...state.cards, card] };
}

export function deleteCard(state: BoardState, cardId: string): BoardState {
  return {
    ...state,
    cards: state.cards.filter((card) => card.id !== cardId),
  };
}

export function moveCard(
  state: BoardState,
  cardId: string,
  columnId: string,
): BoardState {
  const column = state.columns.find((item) => item.id === columnId);
  if (!column) {
    throw new Error("Unknown column");
  }

  let found = false;
  const cards = state.cards.map((card) => {
    if (card.id !== cardId) {
      return card;
    }
    found = true;
    if (card.columnId === columnId) {
      return card;
    }
    return { ...card, columnId };
  });

  if (!found) {
    throw new Error("Unknown card");
  }

  return { ...state, cards };
}

export function renameColumn(
  state: BoardState,
  columnId: string,
  name: string,
): BoardState {
  const nextName = name.trim();
  if (!nextName) {
    throw new Error("Column name is required");
  }

  return {
    ...state,
    columns: state.columns.map((column) =>
      column.id === columnId ? { ...column, name: nextName } : column,
    ),
  };
}

export function updateCard(
  state: BoardState,
  cardId: string,
  input: { title: string; details: string },
): BoardState {
  const title = input.title.trim();
  if (!title) {
    throw new Error("Card title is required");
  }

  return {
    ...state,
    cards: state.cards.map((card) =>
      card.id === cardId
        ? { ...card, title, details: input.details.trim() }
        : card,
    ),
  };
}
