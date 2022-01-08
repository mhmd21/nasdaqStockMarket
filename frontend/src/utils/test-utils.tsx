import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'overmind-react';

type Props = {
  children: ReactElement;
  overmind: any;
};

const AllTheProviders: FC<Props> = ({ children, overmind }) => (
  <Provider value={overmind}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
  overmind?: any,
) =>
  render(ui, {
    wrapper: (props) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <AllTheProviders {...props} overmind={overmind} />
    ),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
