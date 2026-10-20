"use client";

import { useState } from "react";

type ColumnTitleProps = {
  name: string;
  onRename: (name: string) => void;
};

export function ColumnTitle({ name, onRename }: ColumnTitleProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  function startEditing() {
    setDraft(name);
    setEditing(true);
  }

  function commit() {
    const next = draft.trim();
    if (next && next !== name) {
      onRename(next);
    } else {
      setDraft(name);
    }
    setEditing(false);
  }

  if (!editing) {
    return (
      <button
        type="button"
        className="column-title"
        onClick={startEditing}
        aria-label={`Rename column ${name}`}
      >
        {name}
      </button>
    );
  }

  return (
    <input
      className="column-title-input"
      value={draft}
      autoFocus
      aria-label="Column name"
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          commit();
        }
        if (event.key === "Escape") {
          setDraft(name);
          setEditing(false);
        }
      }}
    />
  );
}
