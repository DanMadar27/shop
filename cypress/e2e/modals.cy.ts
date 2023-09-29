import {
  language,
  OPEN_WISHLIST,
  OPEN_CART,
  ADD_TO_CART,
  ADD_ALL_TO_CART,
  CLOSE,
} from '../../src/config/texts';

describe('Open modals', () => {
  it('Wishlist', () => {
    cy.visit('/products');
    cy.get('button').contains('favorite').click();
    cy.get('button').contains(OPEN_WISHLIST[language]).click();
    cy.get('button').contains(ADD_TO_CART[language]).click();
    cy.get('button').contains(ADD_ALL_TO_CART[language]).click();
    cy.get('button').contains(CLOSE[language]).click();
  });

  it('Cart', () => {
    cy.visit('/products/1');
    cy.get('button').contains(ADD_TO_CART[language]).click();
    cy.get('a[href="/products"]').contains('arrow_back').click();
    cy.get('button').contains(OPEN_CART[language]).click();
    cy.get('button').contains('remove').click();
    cy.get('button').contains('add').click();
  });
});
