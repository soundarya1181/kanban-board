"use client";

import { cardsInColumn } from "@/lib/board";
import { useBoard } from "@/lib/useBoard";
import { Column } from "./Column";

export function Board() {
  const board = useBoard();

  return (
    <div className="board-shell">
      <header className="board-header">
        <div>
          <p className="board-kicker">Project board</p>
          <h1 className="board-title">Kanban</h1>
        </div>
        <p className="board-subtitle">
          Add, edit, and move work across five columns.
        </p>
      </header>
      <div className="board">
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            cards={cardsInColumn(board, column.id)}
            onRename={board.renameColumn}
            onAddCard={board.addCard}
            onDeleteCard={board.deleteCard}
            onUpdateCard={board.updateCard}
            onMoveCard={board.moveCard}
          />
        ))}
      </div>
    </div>
  );
}
