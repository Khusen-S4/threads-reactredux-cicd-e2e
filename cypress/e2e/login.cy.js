/* global describe, it, cy */

describe('Login Flow', () => {
  it('Berhasil login', () => {
    cy.visit('/')

    cy.get('input[type="email"]')
      .type('Lala0987@gmail.com')

    cy.get('input[type="password"]')
      .type('lala1234')

    cy.contains('button', 'Login')
      .click()

    cy.contains('h1', 'Cari Jodoh')
      .should('exist')
  })
})

// Visit Login Page
// ↓
// Isi Email
// ↓
// Isi Password
// ↓
// Klik Login
// ↓
// API Login
// ↓
// Token Disimpan
// ↓
// getOwnProfile()
// ↓
// SET_AUTH_USER
// ↓
// Redux Update
// ↓
// HomePage Render
// ↓
// "Cari Jodoh" muncul