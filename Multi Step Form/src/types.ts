export type FormItems = {
  name: string;
  email: string;
  phoneNumber: string;
  timeFrame: string;
  plan: Plan | undefined;
  addons: Addons[];
};

export type FormGroupType = {
  label: string;
  inputType: string;
  placeholder: string;
  value: string | undefined;
  errorMsg?: string;
  updateForm: (value: string) => void;
};

export type UpdateFieldType = (
  setState: React.Dispatch<React.SetStateAction<string>>
) => (event: React.ChangeEvent<HTMLInputElement>) => void;

export type PersonalInfoType = StepTypes & Partial<Errors>;

export type AddonsType = StepTypes & Partial<Errors>;

export type Errors = {
  nameErr: string;
  emailErr: string;
  phoneNumberErr: string;
  addonsErr: string;
};

export type StepTypes = Partial<FormItems> & {
  updateForm: (
    fieldToUpdate: Partial<FormItems>,
    field?: keyof FormItems
  ) => void;
};

export type TimeFrameType = Partial<FormItems> & {
  updateForm: (value: string) => void;
};

export type CardsType = Partial<FormItems> & {
  updateForm: (value: Plan) => void;
};

export type PlanCardType = {
  icon: string;
  title: string;
  price: number;
};

export type Plan = {
  title: string;
  price: number;
};
export type Addons = {
  title: string;
  price: number;
};

export type ServiceType = {
  title: string;
  price: number;
};

export type AddOnsListType = {
  key: string;
  title: string;
  description: string;
  price: number;
};

export type SummaryType = Partial<StepTypes> & {
  navigateTo: (value: number) => void;
  error: string;
};
