/* eslint-disable no-param-reassign */
import { createOvermindMock } from 'overmind';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '../../../utils/test-utils';
import StockScreen from '../StockScreen';
import { config } from '../../../overmind';

describe('Stock Screen', () => {
  test('correctly outputs stock details', async () => {
    const overmind = createOvermindMock(config, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.currentTicker.details = {
        description: 'Atlantic American Corp provides property and casua...',
        industry: 'Insurance - Life',
        logo: 'https://s3.polygon.io/logos/aame/logo.png',
        name: 'Atlantic American Corporation',
        symbol: 'AAME',
        url: 'http://www.atlam.com',
      };
    });

    render(<StockScreen />, {}, overmind);

    const { description, industry, name, url } =
      overmind.state.currentTicker.details;
    const descriptionInside = screen.getByText(description!);
    const industryInside = screen.getByText(industry!);
    const logoInside = screen.getByAltText('logo');
    const nameInside = screen.getByText(name!);
    const urlInside = screen.getByText('Visit Company Website');
    expect(descriptionInside).toBeInTheDocument();
    expect(industryInside).toBeInTheDocument();
    expect(logoInside).toBeInTheDocument();
    expect(nameInside).toBeInTheDocument();
    expect(urlInside).toHaveAttribute('href', url);
  });

  test('correctly outputs stock statistics', async () => {
    const overmind = createOvermindMock(config, (state) => {
      state.currentTicker.statistics = {
        close: 2.91,
        high: 3.0899,
        low: 2.9,
        open: 2.94,
        volume: 17401,
      };
    });

    render(<StockScreen />, {}, overmind);

    const { close, high, low, open, volume } =
      overmind.state.currentTicker.statistics;
    const closeInside = screen.getByText(close!);
    const highInside = screen.getByText(high!);
    const lowInside = screen.getByText(low!);
    const openInside = screen.getByText(open!);
    const volumeInside = screen.getByText(volume!);
    expect(closeInside).toBeInTheDocument();
    expect(highInside).toBeInTheDocument();
    expect(lowInside).toBeInTheDocument();
    expect(openInside).toBeInTheDocument();
    expect(volumeInside).toBeInTheDocument();
  });

  test('correctly shows loading icon while loading ticker data ', async () => {
    const overmind = createOvermindMock(config, (state) => {
      state.isLoading = true;
      state.currentTicker.statistics = {
        close: 2.91,
        high: 3.0899,
        low: 2.9,
        open: 2.94,
        volume: 17401,
      };
    });

    render(<StockScreen />, {}, overmind);

    const loadingIconInside = await waitFor(() =>
      screen.getByTestId('loadingIcon'),
    );
    expect(loadingIconInside).toBeInTheDocument();
  });

  test('correctly shows error popup  ', async () => {
    const overmind = createOvermindMock(config, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.error = ['Error'];
    });

    render(<StockScreen />, {}, overmind);
    const errorInside = await waitFor(() => screen.getByText('Error'));
    expect(errorInside).toBeInTheDocument();
  });
});
