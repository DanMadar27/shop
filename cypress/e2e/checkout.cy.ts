import { login, logout } from '../utils/auth';

describe('Checkout', () => {
  beforeEach(() => {
    login();
  });

  after(() => {
    logout();
  });

  it('Buy products', () => {
    cy.visit('/products');
    cy.get('a').contains('SHOP NOW').click();
    cy.get('button').contains('Buy Now').click();
    cy.url().should('include', '/cart');

    cy.get('button').contains('Checkout').click();
    cy.url().should('include', '/orders');
  });
});