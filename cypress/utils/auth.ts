export function login() {
  Cypress.Cookies.debug(false) // now debugging is turned off

  const sessionToken = Cypress.env('SESSION_TOKEN');
  const csrfToken = Cypress.env('CSRF_TOKEN');
  const callbackUrl = Cypress.env('CALLBACK_URL');

  if (!sessionToken || !csrfToken || !callbackUrl) {
    throw new Error('Missing environment variables SESSION_TOKEN, CSRF_TOKEN or CALLBACK_URL');
  }
  
  cy.setCookie('next-auth.session-token', sessionToken);
  cy.setCookie('next-auth.csrf-token', csrfToken);
  cy.setCookie('next-auth.callback-url', callbackUrl);
}

export function logout() {
  cy.clearCookies();
}
