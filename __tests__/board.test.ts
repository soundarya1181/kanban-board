import { describe, expect, it } from "vitest";
import {
  addCard,
  deleteCard,
  moveCard,
  renameColumn,
} from "@/lib/board";
import { sampleBoard } from "@/lib/sample-data";
import type { BoardState } from "@/lib/types";

function boardWith(cards: BoardState["cards"]): BoardState {
  return {
    columns: sampleBoard.columns,
    cards,
  };
}

describe("board helpers", () => {
  it("adds a card with a title to the given column", () => {
    const next = addCard(sampleBoard, {
      id: "new-card",
      columnId: "col-backlog",
      title: "Plan demo",
      details: "Keep it short",
    });

    const added = next.cards.find((card) => card.id === "new-card");
    expect(added).toMatchObject({
      title: "Plan demo",
      details: "Keep it short",
      columnId: "col-backlog",
    });
    expect(next.cards).toHaveLength(sampleBoard.cards.length + 1);
  });

  it("rejects adding a card with an empty title", () => {
    expect(() =>
      addCard(sampleBoard, { columnId: "col-backlog", title: "   " }),
    ).toThrow("Card title is required");
  });

  it("deletes only the chosen card", () => {
    const next = deleteCard(sampleBoard, "card-1");
    expect(next.cards.find((card) => card.id === "card-1")).toBeUndefined();
    expect(next.cards).toHaveLength(sampleBoard.cards.length - 1);
    expect(next.cards.find((card) => card.id === "card-2")).toBeDefined();
  });

  it("moves a card by updating columnId and does not duplicate it", () => {
    const next = moveCard(sampleBoard, "card-1", "col-done");
    const matches = next.cards.filter((card) => card.id === "card-1");
    expect(matches).toHaveLength(1);
    expect(matches[0].columnId).toBe("col-done");
  });

  it("does not duplicate a card dropped in the same column", () => {
    const start = boardWith([
      {
        id: "only",
        title: "Stay put",
        details: "",
        columnId: "col-ready",
      },
    ]);
    const next = moveCard(start, "only", "col-ready");
    expect(next.cards.filter((card) => card.id === "only")).toHaveLength(1);
    expect(next.cards[0].columnId).toBe("col-ready");
  });

  it("renames only the chosen column", () => {
    const next = renameColumn(sampleBoard, "col-ready", "Up next");
    expect(next.columns.find((column) => column.id === "col-ready")?.name).toBe(
      "Up next",
    );
    expect(
      next.columns.find((column) => column.id === "col-backlog")?.name,
    ).toBe("Backlog");
  });
});
