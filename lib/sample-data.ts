import type { BoardState } from "./types";

export const sampleBoard: BoardState = {
  columns: [
    { id: "col-backlog", name: "Backlog" },
    { id: "col-ready", name: "Ready" },
    { id: "col-in-progress", name: "In Progress" },
    { id: "col-review", name: "Review" },
    { id: "col-done", name: "Done" },
  ],
  cards: [
    {
      id: "card-1",
      title: "Draft kickoff agenda",
      details: "List goals, owners, and the first milestone for the team meeting.",
      columnId: "col-backlog",
    },
    {
      id: "card-2",
      title: "Collect stakeholder notes",
      details: "Gather feedback from last week’s planning session.",
      columnId: "col-backlog",
    },
    {
      id: "card-3",
      title: "Sketch board wireframe",
      details: "Five columns, card title and details, add and delete controls.",
      columnId: "col-ready",
    },
    {
      id: "card-4",
      title: "Write sample tasks",
      details: "Prepare 8–12 realistic cards so the board is not empty on first load.",
      columnId: "col-ready",
    },
    {
      id: "card-5",
      title: "Build column layout",
      details: "Render the five columns in a desktop-first row with consistent spacing.",
      columnId: "col-in-progress",
    },
    {
      id: "card-6",
      title: "Wire board state",
      details: "Keep add, delete, move, and rename in one helper module.",
      columnId: "col-in-progress",
    },
    {
      id: "card-7",
      title: "Review add-card form",
      details: "Title is required; details are optional. Empty titles must be rejected.",
      columnId: "col-review",
    },
    {
      id: "card-8",
      title: "Check column rename",
      details: "Renaming a column must not move or lose any cards.",
      columnId: "col-review",
    },
    {
      id: "card-9",
      title: "Choose default columns",
      details: "Backlog, Ready, In Progress, Review, and Done.",
      columnId: "col-done",
    },
    {
      id: "card-10",
      title: "Define card fields",
      details: "Each card has an id, title, details, and columnId.",
      columnId: "col-done",
    },
  ],
};
