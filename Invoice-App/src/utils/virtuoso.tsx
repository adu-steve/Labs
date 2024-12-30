import { VirtuosoMockContext } from "react-virtuoso";

/* All the code contained in this file is for testing purposes */

type WrapperProps = {
  children: React.ReactNode;
};

type VirtuosoWrapperProps = {
  viewportHeight: number;
  viewportWidth?: number;
  itemHeight: number;
  itemWidth?: number;
};

export const VirtuosoWrapper =
  (props: VirtuosoWrapperProps) =>
  ({ children }: WrapperProps) =>
    (
      <VirtuosoMockContext.Provider value={props}>
        {children}
      </VirtuosoMockContext.Provider>
    );
