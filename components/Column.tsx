"use client";

import { DragEvent } from "react";
import type { Card as CardModel, Column as ColumnModel } from "@/lib/types";
import { AddCardForm } from "./AddCardForm";
import { Card } from "./Card";
import { ColumnTitle } from "./ColumnTitle";

type ColumnProps = {
  column: ColumnModel;
  cards: CardModel[];
  onRename: (columnId: string, name: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
  onUpdateCard: (cardId: string, title: string, details: string) => void;
  onMoveCard: (cardId: string, columnId: string) => void;
};

export function Column({
  column,
  cards,
  onRename,
  onAddCard,
  onDeleteCard,
  onUpdateCard,
  onMoveCard,
}: ColumnProps) {
  function handleDragOver(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text/plain");
    if (cardId) {
      onMoveCard(cardId, column.id);
    }
  }

  function handleDragStart(event: DragEvent<HTMLElement>, cardId: string) {
    event.dataTransfer.setData("text/plain", cardId);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <section
      className="column"
      aria-label={column.name}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <header className="column-header">
        <ColumnTitle
          name={column.name}
          onRename={(name) => onRename(column.id, name)}
        />
        <span className="column-count">{cards.length}</span>
      </header>
      <div className="column-cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={onDeleteCard}
            onUpdate={onUpdateCard}
            onDragStart={handleDragStart}
          />
        ))}
      </div>
      <AddCardForm
        onAdd={(title, details) => onAddCard(column.id, title, details)}
      />
    </section>
  );
}
