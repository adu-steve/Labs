import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import BillTo from "./Bill.tsx";
import { describe, expect, test } from "vitest";

const renderWithFormProvider = (defaultValues = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      defaultValues,
      mode: "onTouched",
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  render(
    <Wrapper>
      <BillTo />
    </Wrapper>,
  );
};

describe("BillTo Component", () => {
  test("renders all fields correctly", () => {
    renderWithFormProvider();

    expect(screen.getByText("Bill to")).toBeInTheDocument();
    expect(screen.getByLabelText("Client's Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Client's Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Street Address")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("Postal Code")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  test("validates clientName field", async () => {
    renderWithFormProvider();

    const clientNameInput = screen.getByLabelText("Client's Name");
    fireEvent.blur(clientNameInput);

    const errorMsg = await screen.findByText(/can't be empty/i);
    expect(errorMsg).toBeInTheDocument();

    fireEvent.change(clientNameInput, { target: { value: "" } });
    fireEvent.blur(clientNameInput);

    expect(errorMsg).toBeInTheDocument();

    fireEvent.change(clientNameInput, { target: { value: "1234" } });
    fireEvent.blur(clientNameInput);

    const newErrorMsg = await screen.findByText(
      "can't contain numbers or symbols",
    );
    expect(newErrorMsg).toBeInTheDocument();

    fireEvent.change(clientNameInput, { target: { value: "John Doe" } });
    fireEvent.blur(clientNameInput);

    expect(await screen.queryByText(/can't be empty/i)).not.toBeInTheDocument();
    expect(
      await screen.queryByText("can't contain numbers or symbols"),
    ).not.toBeInTheDocument();
  });

  test("validates clientEmail field", async () => {
    renderWithFormProvider();

    const clientEmailInput = screen.getByLabelText("Client's Email");
    fireEvent.blur(clientEmailInput);

    const errorMsg = await screen.findByText(/can't be empty/i);
    expect(errorMsg).toBeInTheDocument();

    fireEvent.change(clientEmailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(clientEmailInput);

    expect(
      await screen.findByText("invalid email address"),
    ).toBeInTheDocument();

    fireEvent.change(clientEmailInput, {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.blur(clientEmailInput);

    expect(screen.queryByText("can't be empty")).not.toBeInTheDocument();
  });

  test("renders FormAddress component", () => {
    renderWithFormProvider();

    expect(screen.getByText("Street Address")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
  });
});
