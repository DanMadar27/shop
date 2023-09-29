describe('Open modals', () => {
  it('Wishlist', () => {
    cy.visit('/products');
    cy.get('button').contains('favorite').click();
    cy.get('button').contains('Wishlist').click();
    cy.get('button').contains('Add to cart').click();
    cy.get('button').contains('Add all to cart').click();
    cy.get('button').contains('Close').click();
  });

  it('Cart', () => {
    cy.visit('/products/1');
    cy.get('button').contains('Add to cart').click();
    cy.get('a[href="/products"]').contains('arrow_back').click();
    cy.get('button').contains('Cart').click();
    cy.get('button').contains('remove').click();
    cy.get('button').contains('add').click();
  });
});
