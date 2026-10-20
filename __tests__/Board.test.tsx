import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Board } from "@/components/Board";
import { sampleBoard } from "@/lib/sample-data";

describe("Board", () => {
  it("renders five columns and sample cards", () => {
    render(<Board />);

    for (const column of sampleBoard.columns) {
      expect(
        screen.getByRole("button", { name: `Rename column ${column.name}` }),
      ).toBeInTheDocument();
    }

    expect(screen.getByText("Draft kickoff agenda")).toBeInTheDocument();
    expect(screen.getByText("Build column layout")).toBeInTheDocument();
    expect(screen.getByText("Define card fields")).toBeInTheDocument();
  });

  it("adds a card to a column", async () => {
    const user = userEvent.setup();
    render(<Board />);

    const backlog = screen.getByRole("region", { name: "Backlog" });
    await user.type(
      within(backlog).getByLabelText("Card title"),
      "Ship checklist",
    );
    await user.type(
      within(backlog).getByLabelText("Card details"),
      "Confirm the five columns still work",
    );
    await user.click(within(backlog).getByRole("button", { name: "Add card" }));

    expect(within(backlog).getByText("Ship checklist")).toBeInTheDocument();
  });

  it("deletes a card from the board", async () => {
    const user = userEvent.setup();
    render(<Board />);

    const cardTitle = screen.getByText("Draft kickoff agenda");
    const card = cardTitle.closest("article");
    expect(card).not.toBeNull();
    await user.click(within(card as HTMLElement).getByRole("button", { name: "Delete" }));

    expect(screen.queryByText("Draft kickoff agenda")).not.toBeInTheDocument();
  });

  it("renames a column", async () => {
    const user = userEvent.setup();
    render(<Board />);

    await user.click(
      screen.getByRole("button", { name: "Rename column Backlog" }),
    );
    const input = screen.getByLabelText("Column name");
    await user.clear(input);
    await user.type(input, "Ideas");
    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("button", { name: "Rename column Ideas" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Rename column Backlog" }),
    ).not.toBeInTheDocument();
  });

  it("moves a card to another column with drag and drop", () => {
    render(<Board />);

    const card = screen.getByText("Draft kickoff agenda").closest("article");
    const review = screen.getByRole("region", { name: "Review" });
    expect(card).not.toBeNull();

    const dataTransfer = {
      data: "",
      effectAllowed: "move",
      dropEffect: "move",
      setData(_type: string, value: string) {
        this.data = value;
      },
      getData() {
        return this.data;
      },
    };

    fireEvent.dragStart(card as HTMLElement, { dataTransfer });
    fireEvent.dragOver(review, { dataTransfer });
    fireEvent.drop(review, { dataTransfer });

    expect(within(review).getByText("Draft kickoff agenda")).toBeInTheDocument();
    expect(
      within(screen.getByRole("region", { name: "Backlog" })).queryByText(
        "Draft kickoff agenda",
      ),
    ).not.toBeInTheDocument();
  });
});
