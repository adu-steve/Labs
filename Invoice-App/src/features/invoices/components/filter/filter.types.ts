export type FilterProps = {
  open?: boolean;
  options: {
    draft: boolean;
    pending: boolean;
    paid: boolean;
  };

  onChange: (name: string, value: boolean) => void;
  onClick: (val: boolean) => void;
};
