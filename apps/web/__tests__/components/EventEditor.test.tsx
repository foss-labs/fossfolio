import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

const mocks = vi.hoisted(() => ({
  patch: vi.fn().mockResolvedValue({}),
  success: vi.fn(),
  error: vi.fn(),
  canEditEvent: true,
  event: {
    name: "Event",
    slug: "event",
    description: JSON.stringify({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text: "Saved description" }],
        },
      ],
    }),
  },
}));

vi.mock("next/router", () => ({
  useRouter: () => ({ query: { id: "org-id", eventid: "event-id" } }),
}));
vi.mock("@app/config", () => ({
  apiHandler: { patch: mocks.patch },
  ENV: { web_base_url: "http://localhost" },
}));
vi.mock("@app/hooks/api/Events", () => ({
  useEvent: () => ({ data: mocks.event, isLoading: false }),
}));
vi.mock("@app/hooks", () => ({
  useMediaQuery: () => false,
  useRoles: () => ({ canEditEvent: mocks.canEditEvent }),
}));
vi.mock("@app/layout", () => ({ DashboardLayout: () => null }));
vi.mock("@app/components/preloaders", () => ({ Loader: () => null }));
vi.mock("sonner", () => ({
  toast: { success: mocks.success, error: mocks.error },
}));

import Event from "@app/pages/org/[id]/[eventid]/event";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  mocks.canEditEvent = true;
});

describe("Event description editor integration", () => {
  it("loads stored JSON and saves the latest content to the event update endpoint", async () => {
    render(<Event />);
    await screen.findByText("Saved description");
    fireEvent.change(screen.getByLabelText("Text style"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save description" }));
    await waitFor(() => expect(mocks.patch).toHaveBeenCalled());
    const [url, body] = mocks.patch.mock.lastCall!;
    expect(url).toBe("/events/org-id/event-id");
    expect(JSON.parse(body.description).content[0].type).toBe("heading");
    await waitFor(() => expect(mocks.success).toHaveBeenCalled());
  });

  it("uses the latest content for the keyboard save shortcut and reports failures", async () => {
    mocks.patch.mockRejectedValueOnce(new Error("Network error"));
    render(<Event />);
    await screen.findByText("Saved description");
    fireEvent.change(screen.getByLabelText("Text style"), {
      target: { value: "3" },
    });
    fireEvent.keyDown(window, { ctrlKey: true, key: "s" });
    await waitFor(() => expect(mocks.patch).toHaveBeenCalled());
    expect(
      JSON.parse(mocks.patch.mock.lastCall![1].description).content[0].attrs
        .level,
    ).toBe(3);
    await waitFor(() => expect(mocks.error).toHaveBeenCalled());
    expect(mocks.success).not.toHaveBeenCalled();
  });

  it("does not expose formatting or allow saving without edit permissions", async () => {
    mocks.canEditEvent = false;
    render(<Event />);
    await screen.findByText("Saved description");
    expect(
      screen.queryByRole("button", { name: "Save description" }),
    ).toBeNull();
    expect(screen.queryByLabelText("Text formatting")).toBeNull();
    fireEvent.keyDown(window, { metaKey: true, key: "s" });
    expect(mocks.patch).not.toHaveBeenCalled();
  });
});
