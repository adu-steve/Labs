import { describe, test, expect } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import DateTerms from "./DateTerms.tsx";
import { renderWithProviders } from "../../../utils/renderwithproviders.tsx";

const renderWithFormProvider = (defaultValues = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
      defaultValues,
      mode: "onTouched",
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  renderWithProviders(
    <Wrapper>
      <DateTerms />
    </Wrapper>,
    // {
    //   preloadedState: {
    //     modal: {
    //       showPaymentTerms: true,
    //     },
    //   },
    // },
  );
};
describe("Date and Terms component", () => {
  test("should render date and terms components", () => {
    renderWithFormProvider({ paymentTerms: 1 });

    const dateInput = screen.getByLabelText(/invoice date/i);
    const termsSelector = screen.getByText(/payment terms/i);
    const currentTerm = screen.getByRole("button", { name: /net 1 day/i });

    expect(dateInput).toBeInTheDocument();
    expect(termsSelector).toBeInTheDocument();
    expect(currentTerm).toBeInTheDocument();
  });

  test("should validate date input", async () => {
    renderWithFormProvider();

    const dateInput = screen.getByLabelText(/invoice date/i);
    fireEvent.click(dateInput);
    fireEvent.blur(dateInput);

    expect(await screen.findByText(/required/i)).toBeInTheDocument();

    fireEvent.click(dateInput);
    fireEvent.change(dateInput, { target: { value: "2023-01-01" } });
    fireEvent.blur(dateInput);

    expect(await screen.findByText(/required/i)).not.toBeInTheDocument();
  });

  test("should render select plan correctly", () => {
    renderWithFormProvider({ paymentTerms: 1 });

    const planSelector = screen.getByRole("button", { name: /net 1 day/i });
    fireEvent.click(planSelector);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(4);
  });

  test("should display selected plan and hide plan selector", () => {
    renderWithFormProvider({ paymentTerms: 1 });

    const planSelectorButton = screen.getByRole("button", {
      name: /net 1 day/i,
    });
    fireEvent.click(planSelectorButton);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(4);

    const selectPlan = screen.getByText(/net 7 day/i);
    fireEvent.click(selectPlan);

    const list1 = screen.queryByRole("list");
    const newPlan = screen.getByRole("button", { name: /net 7 days/i });
    expect(newPlan).toBeInTheDocument();
    expect(list1).not.toBeInTheDocument();
  });
});
