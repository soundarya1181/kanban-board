"use client";

import { DragEvent, useState } from "react";
import type { Card as CardModel } from "@/lib/types";

type CardProps = {
  card: CardModel;
  onDelete: (cardId: string) => void;
  onUpdate: (cardId: string, title: string, details: string) => void;
  onDragStart: (event: DragEvent<HTMLElement>, cardId: string) => void;
};

export function Card({ card, onDelete, onUpdate, onDragStart }: CardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [details, setDetails] = useState(card.details);

  function startEditing() {
    setTitle(card.title);
    setDetails(card.details);
    setEditing(true);
  }

  function commit() {
    const nextTitle = title.trim();
    if (!nextTitle) {
      setTitle(card.title);
      setDetails(card.details);
      setEditing(false);
      return;
    }
    if (nextTitle !== card.title || details.trim() !== card.details) {
      onUpdate(card.id, nextTitle, details);
    }
    setEditing(false);
  }

  return (
    <article
      className="card"
      draggable={!editing}
      onDragStart={(event) => onDragStart(event, card.id)}
    >
      {editing ? (
        <div className="card-edit">
          <input
            className="card-title-input"
            value={title}
            aria-label="Edit card title"
            autoFocus
            onChange={(event) => setTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commit();
              }
              if (event.key === "Escape") {
                setTitle(card.title);
                setDetails(card.details);
                setEditing(false);
              }
            }}
          />
          <textarea
            className="card-details-input"
            value={details}
            aria-label="Edit card details"
            rows={3}
            onChange={(event) => setDetails(event.target.value)}
          />
          <button type="button" className="card-save" onClick={commit}>
            Save
          </button>
        </div>
      ) : (
        <>
          <h3 className="card-title">{card.title}</h3>
          {card.details ? <p className="card-details">{card.details}</p> : null}
          <div className="card-actions">
            <button
              type="button"
              className="card-action"
              onClick={startEditing}
            >
              Edit
            </button>
            <button
              type="button"
              className="card-action danger"
              onClick={() => onDelete(card.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  );
}
