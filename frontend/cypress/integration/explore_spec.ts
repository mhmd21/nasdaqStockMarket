describe('correctly navigates the explore screen', () => {
  it('renders correctly', () => {
    cy.visit('/');
  });
  it('can scroll to get more tickers', () => {
    cy.scrollTo(0, 1200);
    cy.wait(3000);
    cy.intercept({
      method: 'POST',
      pathname: 'http://localhost:5000/tickers/next',
    });
  });
  it('can search and press on a ticker', () => {
    cy.get('#searchBar').type('PLT');
    cy.wait(3000);
    cy.intercept({
      method: 'POST',
      pathname: 'http://localhost:5000/tickers/next',
      query: {
        search: 'PLT',
      },
    });
    cy.get('#PLTR').click();
  });
  it('can go back from stock page to explore', () => {
    cy.get('#ArrowBackIcon').click();
  });
});
