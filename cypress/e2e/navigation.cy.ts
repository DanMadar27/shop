import { login, logout } from '../utils/auth';

describe('Pages', () => {
  beforeEach(() => {
    login();
  });
  
  after(() => {
    logout();
  });

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

describe('Home', () => {
  it('Navigate to home with navbar', () => {
    cy.visit('/login');
    cy.get('nav a').contains('Home').click();
    cy.url().should('include', '/').should('not.contain', '/login');
  });

  it('Navigate to home with logo', () => {
    cy.visit('/login');
    cy.get('nav img').click();
    cy.url().should('include', '/').should('not.contain', '/login');
  });
});

describe('Login', () => {
  it('Navigate with home login button', () => {
    cy.visit('/');
    cy.get('[id="home-login-button"]').click();
    cy.url().should('include', '/login');
  });

  it('Navigate with navbar', () => {
    cy.visit('/');
    cy.get('nav button').contains('Login').click();
    cy.url().should('include', '/login');
  });
});

describe('Products', () => {
  it('Navigate to products with home button', () => {
    cy.visit('/');
    cy.get('button').contains('See Products').click();
    cy.url().should('include', '/products');
  });

  it('Navigate to products with navbar', () => {
    cy.visit('/');
    cy.get('nav a').contains('Products').click();
    cy.url().should('include', '/products');
  });

  it('Navigate to product', () => {
    cy.visit('/products');
    cy.get('a').contains('SHOP NOW').click();
    cy.url().should('include', '/products/1');
  });

  it('Back link to products', () => {
    cy.visit('/products/1');
    cy.get('a').contains('arrow_back').click();
    cy.url().should('include', '/products').should('not.contain', '/products/');
  });

});

describe('Orders', () => {
  beforeEach(() => {
    login();
  });
  
  after(() => {
    logout();
  });
  
  it('Navigate to cart', () => {
    cy.visit('/');
    cy.get('nav a').contains('Cart').click();
    cy.url().should('include', '/cart');
  });

  it('Navigate to orders', () => {
    cy.visit('/');
    cy.get('nav a').contains('Orders').click();
    cy.url().should('include', '/orders');
  });

  it('Navigate to order', () => {
    cy.visit('/orders');
    cy.get('a').contains('Order 1').click();
    cy.url().should('include', '/orders/1');
  });

  it('Back link to orders', () => {
    cy.visit('/orders/1');
    cy.get('a').contains('arrow_back').click();
    cy.url().should('include', '/orders').should('not.contain', '/orders/')
  });
});

describe('Footer', () => {
  it('Navigate to home', () => {
    cy.visit('/login');
    cy.get('footer a').contains('Home').click();
    cy.url().should('include', '/').should('not.contain', '/login');
  });

  it('Navigate to login', () => {
    cy.visit('/');
    cy.get('footer a').contains('Login').click();
    cy.url().should('include', '/login');
  });
  
  it('Navigate to products', () => {
    cy.visit('/');
    cy.get('footer a').contains('Products').click();
    cy.url().should('include', '/products');
  });

  it('Navigate to cart', () => {
    login();
    cy.visit('/');
    cy.get('footer a').contains('Cart').click();
    cy.url().should('include', '/cart');
  });

  it('Navigate to orders', () => {
    login();
    cy.visit('/');
    cy.get('footer a').contains('Orders').click();
    cy.url().should('include', '/orders');
  });
});