/**
 * Skenario Testing
 *
 * LoginPage component
 *  - harus menampilkan input email dan password
 *  - harus memperbarui nilai input email ketika pengguna mengetik
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import LoginPage from './LoginPage'

const mockDispatch = vi.fn()

vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}))

describe('LoginPage component', () => {
  it('harus menampilkan input email dan password', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    expect(
      screen.getByPlaceholderText('Email')
    ).toBeInTheDocument()

    expect(
      screen.getByPlaceholderText('Password')
    ).toBeInTheDocument()
  })

  it('harus memperbarui nilai input email ketika pengguna mengetik', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

    const emailInput =
      screen.getByPlaceholderText('Email')

    await userEvent.type(
      emailInput,
      'aka@test.com'
    )

    expect(emailInput).toHaveValue(
      'aka@test.com'
    )
  })
})