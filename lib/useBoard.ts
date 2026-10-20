"use client";

import { useCallback, useState } from "react";
import {
  addCard,
  deleteCard,
  moveCard,
  renameColumn,
  updateCard,
} from "./board";
import { sampleBoard } from "./sample-data";
import type { BoardState } from "./types";

export function useBoard() {
  const [state, setState] = useState<BoardState>(sampleBoard);

  const handleAddCard = useCallback(
    (columnId: string, title: string, details: string) => {
      setState((current) => addCard(current, { columnId, title, details }));
    },
    [],
  );

  const handleDeleteCard = useCallback((cardId: string) => {
    setState((current) => deleteCard(current, cardId));
  }, []);

  const handleMoveCard = useCallback((cardId: string, columnId: string) => {
    setState((current) => moveCard(current, cardId, columnId));
  }, []);

  const handleRenameColumn = useCallback((columnId: string, name: string) => {
    setState((current) => renameColumn(current, columnId, name));
  }, []);

  const handleUpdateCard = useCallback(
    (cardId: string, title: string, details: string) => {
      setState((current) => updateCard(current, cardId, { title, details }));
    },
    [],
  );

  return {
    columns: state.columns,
    cards: state.cards,
    addCard: handleAddCard,
    deleteCard: handleDeleteCard,
    moveCard: handleMoveCard,
    renameColumn: handleRenameColumn,
    updateCard: handleUpdateCard,
  };
}
