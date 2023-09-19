describe('Pages', () => {
  it('home', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Welcome To The Shop');
  });

  it('login', () => {
    cy.visit('/login');
    cy.get('h1').should('contain', 'Shop');
  });

  it('products', () => {
    cy.visit('/products');
  });

  it('product', () => {
    cy.visit('/products/1');
  });

  it('cart', () => {
    cy.visit('/cart');
  });

  it('orders', () => {
    cy.visit('/orders');
  });

  it('order', () => {
    cy.visit('/orders/1');
  });
});