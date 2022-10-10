import Notes from "./Notes";
import { render, getByText, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { UserAuth } from "../context/AuthContext";
import { AuthContextProvider } from "../context/AuthContext";
import { NoteProvider } from "../context/NoteContext";

describe("New Event Form", () => {
  const onSubmit = jest.fn();

  it("form works correctly", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <AuthContextProvider>
        <NoteProvider>
          <Notes />
        </NoteProvider>
      </AuthContextProvider>
    );

    user.type(getEventName(), "Battle of Sondrio");

    const when = await screen.findByRole("textbox", {name:/when did the event take place\?/i})
    user.type(when, "1500");
    user.type(getWhere(), "Sondrio");

    user.type(getWhy(), "Because yes");
    user.type(getWho(), "My grandma");
    user.type(getBeginning(), "It started like this...");
    user.type(getUnfold(), "It developed like that...");
    user.type(getEnd(), "It ended like that...");
    user.type(getSource(), "Source x and y");
    user.type(getTag(), "tag x, tag y");

    user.click(createEvent);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({ lazy: true });
  });
});

const getEventName = () => screen.getByPlaceholderText(/name of the event/i);
const getWhen = () =>
  screen.getByPlaceholderText(/when did the event take place\?/i);
const getWhy = () => screen.getByPlaceholderText(/why did the event happen\?/i);
const getWho = () =>
  screen.getByPlaceholderText(/who was involved in this event\?/i);
const getWhere = () => screen.getByRole("combobox");
const getBeginning = () => screen.getByPlaceholderText(/how did it start\?/i);
const getUnfold = () => screen.getByPlaceholderText(/how did it unfold\?/i);
const getEnd = () => screen.getByPlaceholderText(/how did it end\?/i);
const getSource = () =>
  screen.getByPlaceholderText(/what sources did you use for it\?/i);
const getTag = () =>
  screen.getByText(
    /\{ settag\(e\.target\.value\); \}\} type="text" name="tag" \/>/i
  );
const createEvent = () =>
  screen.getByRole("button", {
    name: /create event/i,
  });
