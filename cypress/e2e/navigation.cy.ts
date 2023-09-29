import { login, logout } from '../utils/auth';

import {
  language,
  APP_TITLE,
  APP_TITLE_INTRODUCTION,
  HOME,
  PRODUCTS,
  LOGIN,
  CART,
  ORDERS,
  EXPLORE,
  BUY_NOW,
  ORDER,
} from '../../src/config/texts';

describe('Pages', () => {
  beforeEach(() => {
    login();
  });
  
  after(() => {
    logout();
  });

  it('home', () => {
    cy.visit('/');
    cy.get('h1').should('contain', APP_TITLE_INTRODUCTION[language]);
  });

  it('login', () => {
    cy.visit('/login');
    cy.get('h1').should('contain', APP_TITLE[language]);
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
    cy.get('nav a').contains(HOME[language]).click();
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
    cy.get('nav button').contains(LOGIN[language]).click();
    cy.url().should('include', '/login');
  });
});

describe('Products', () => {
  it('Navigate to products with home button', () => {
    cy.visit('/');
    cy.get('button').contains(EXPLORE[language]).click();
    cy.url().should('include', '/products');
  });

  it('Navigate to products with navbar', () => {
    cy.visit('/');
    cy.get('nav a').contains(PRODUCTS[language]).click();
    cy.url().should('include', '/products');
  });

  it('Navigate to product', () => {
    cy.visit('/products');
    cy.get('a').contains(BUY_NOW[language]).click();
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
    cy.get('nav a').contains(CART[language]).click();
    cy.url().should('include', '/cart');
  });

  it('Navigate to orders', () => {
    cy.visit('/');
    cy.get('nav a').contains(ORDERS[language]).click();
    cy.url().should('include', '/orders');
  });

  it('Navigate to order', () => {
    cy.visit('/orders');
    cy.get('a').contains(`${ORDER[language]} 1`).click();
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
    cy.get('footer a').contains(HOME[language]).click();
    cy.url().should('include', '/').should('not.contain', '/login');
  });

  it('Navigate to login', () => {
    cy.visit('/');
    cy.get('footer a').contains(LOGIN[language]).click();
    cy.url().should('include', '/login');
  });
  
  it('Navigate to products', () => {
    cy.visit('/');
    cy.get('footer a').contains(PRODUCTS[language]).click();
    cy.url().should('include', '/products');
  });

  it('Navigate to cart', () => {
    login();
    cy.visit('/');
    cy.get('footer a').contains(CART[language]).click();
    cy.url().should('include', '/cart');
  });

  it('Navigate to orders', () => {
    login();
    cy.visit('/');
    cy.get('footer a').contains(ORDERS[language]).click();
    cy.url().should('include', '/orders');
  });
});