import { describe, test, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/renderwithproviders.tsx";
import Form from "./Form.tsx";

describe("Form component", () => {
  const toggleForm = vi.fn();
  const mockInitialValues = {
    id: "123",
    clientName: "halic",
    clientEmail: "halic@gmail.com",
    createdAt: "2024-12-29",
    paymentDue: "2024-12-30",
    description: "hello",
    paymentTerms: 1,
    clientAddress: {
      street: "123 Main St",
      city: "Springfield",
      postCode: "12345",
      country: "USA",
    },
    senderAddress: {
      street: "456 Elm St",
      city: "Shelbyville",
      postCode: "67890",
      country: "USA",
    },
    items: [{ name: "Test Item", quantity: 1, price: 100, total: 100 }],
    status: "draft",
    total: 100,
  };
  test("should render form components", () => {
    //todo: implement this test
    renderWithProviders(<Form toggleForm={toggleForm} type={"newInvoice"} />);

    const headline = screen.getByRole("heading", { name: /new invoice/i });
    // const clientName = screen.getByRole("textbox", { name: /client's name/i });
    const clientName = screen.getByLabelText(/client's name/i);
    const clientEmail = screen.getByLabelText(/client's email/i);
    const description = screen.getByLabelText(/description/i);
    const paymentTerms = screen.getByText(/payment terms/i);
    const cityInputs = screen.getAllByLabelText(/city/i);
    const countryInputs = screen.getAllByLabelText(/country/i);
    const postalCodeInputs = screen.getAllByLabelText(/postal code/i);
    const streetInputs = screen.getAllByLabelText(/street/i);
    const saveButton = screen.getByRole("button", { name: /save & send/i });
    const discardButton = screen.getByRole("button", { name: /discard/i });
    const saveDraftButton = screen.getByRole("button", {
      name: /save as draft/i,
    });

    expect(headline).toBeInTheDocument();
    expect(clientName).toBeInTheDocument();
    expect(clientEmail).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(paymentTerms).toBeInTheDocument();

    cityInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    countryInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    postalCodeInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    streetInputs.forEach((input) => {
      expect(input).toBeInTheDocument();
    });

    expect(saveButton).toBeInTheDocument();
    expect(discardButton).toBeInTheDocument();
    expect(saveDraftButton).toBeInTheDocument();
  });

  test("save button should be disabled on initial render for new invoice", () => {
    //todo: implement this test
    renderWithProviders(<Form toggleForm={toggleForm} type={"newInvoice"} />);

    const saveButton = screen.getByRole("button", { name: /save & send/i });
    expect(saveButton).toBeDisabled();
  });

  test("save button should be disabled on edit if form is invalid", () => {
    //todo: implement this test
    renderWithProviders(
      <Form
        toggleForm={toggleForm}
        type={"edit"}
        initialValues={mockInitialValues}
      />,
    );

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  test("should validate form inputs", async () => {
    //todo: implement this test
    renderWithProviders(<Form toggleForm={toggleForm} type={"newInvoice"} />);

    const description = screen.getByLabelText(/project description/i);
    expect(description).toBeInTheDocument();
    expect(description).toHaveValue("");
    fireEvent.blur(description);

    expect(await screen.findByText(/can't be empty/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/all fields must be added/i),
    ).toBeInTheDocument();

    fireEvent.change(description, { target: { value: "" } });
    fireEvent.blur(description);

    expect(await screen.findByText(/can't be empty/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/all fields must be added/i),
    ).toBeInTheDocument();

    fireEvent.change(description, { target: { value: "hello" } });
    fireEvent.blur(description);

    expect(description).toHaveValue("hello");
  });

  test("should reset form when the discard button is clicked", () => {
    //todo: implement this test
    renderWithProviders(<Form toggleForm={toggleForm} type={"newInvoice"} />);

    const clientName = screen.getByLabelText(/client's name/i);
    expect(clientName).toHaveValue("");

    fireEvent.change(clientName, { target: { value: "new name" } });
    fireEvent.blur(clientName);

    expect(clientName).toHaveValue("new name");

    const discardButton = screen.getByRole("button", { name: /discard/i });
    fireEvent.click(discardButton);

    expect(clientName).toHaveValue("");
  });

  test("should reset form when the cancel button is clicked", () => {
    //todo: implement this test
    renderWithProviders(
      <Form
        toggleForm={toggleForm}
        type={"edit"}
        initialValues={mockInitialValues}
      />,
    );

    const clientName = screen.getByLabelText(/client's name/i);
    expect(clientName).toHaveValue("halic");

    fireEvent.change(clientName, { target: { value: "new name" } });
    fireEvent.blur(clientName);

    expect(clientName).toHaveValue("new name");

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(clientName).toHaveValue("halic");
  });

  test("should handle form save draft", async () => {
    //todo: implement this test
    renderWithProviders(<Form toggleForm={toggleForm} type={"newInvoice"} />, {
      preloadedState: {
        invoice: {
          invoices: [],
          currentInvoice: { invoice: undefined, loading: "idle", error: null },
          statusFilter: [],
          loading: "idle",
          error: null,
        },
      },
    });

    const saveDraftButton = screen.getByRole("button", {
      name: /save as draft/i,
    });

    expect(saveDraftButton).toBeEnabled();

    fireEvent.click(saveDraftButton);

    expect(saveDraftButton).toBeDisabled();
  });
});
