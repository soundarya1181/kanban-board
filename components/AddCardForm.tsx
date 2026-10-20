"use client";

import { FormEvent, useState } from "react";

type AddCardFormProps = {
  onAdd: (title: string, details: string) => void;
};

export function AddCardForm({ onAdd }: AddCardFormProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    onAdd(title, details);
    setTitle("");
    setDetails("");
    setError("");
  }

  return (
    <form className="add-card-form" onSubmit={handleSubmit}>
      <input
        className="add-card-title"
        placeholder="Card title"
        value={title}
        aria-label="Card title"
        onChange={(event) => {
          setTitle(event.target.value);
          if (error) {
            setError("");
          }
        }}
      />
      <textarea
        className="add-card-details"
        placeholder="Details (optional)"
        value={details}
        aria-label="Card details"
        rows={2}
        onChange={(event) => setDetails(event.target.value)}
      />
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" className="add-card-button">
        Add card
      </button>
    </form>
  );
}
