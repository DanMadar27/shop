import { login, logout } from '../utils/auth';

import {
  language,
  BUY_NOW,
  CHECKOUT,
} from '../../src/config/texts';

describe('Checkout', () => {
  beforeEach(() => {
    login();
  });

  after(() => {
    logout();
  });

  it('Buy products', () => {
    cy.visit('/products');
    cy.get('a').contains(BUY_NOW[language]).click();
    cy.get('button').contains(BUY_NOW[language]).click();
    cy.url().should('include', '/cart');

    cy.get('button').contains(CHECKOUT[language]).click();
    cy.url().should('include', '/orders');
  });
});