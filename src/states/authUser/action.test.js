/**
 * Skenario Testing
 *
 * asyncSetAuthUser thunk
 *  - harus dispatch action SET_AUTH_USER ketika login berhasil
 *  - harus melempar error ketika login gagal
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  asyncSetAuthUser,
  setAuthUserActionCreator,
} from './action'

import * as api from '../../utils/api'

vi.mock('../../utils/api', () => ({
  login: vi.fn(),
  putAccessToken: vi.fn(),
  getOwnProfile: vi.fn(),
}))
beforeEach(() => {
  vi.clearAllMocks()
})

describe('Fungsi autentication User Action' , () => {
  it('harus dispatch action SET_AUTH_USER ketika login berhasil', async () => {
    const fakeToken = 'token-123'

    const fakeUser = {
        id: 'user-1',
        name: 'Aka',
        email: 'aka@test.com',
    }

    api.login.mockResolvedValue(fakeToken)

    api.getOwnProfile.mockResolvedValue(fakeUser)

    const dispatch = vi.fn()

    await asyncSetAuthUser({
        email: 'aka@test.com',
        password: 'password',
    })(dispatch)

    expect(api.login).toHaveBeenCalledWith({
        email: 'aka@test.com',
        password: 'password',
    })

    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken)

    expect(dispatch).toHaveBeenCalledWith(
        setAuthUserActionCreator(fakeUser)
    )
    })

  it('harus melempar error ketika login gagal', async () => {
    const errorResponse = new Error('Email atau password salah')

    api.login.mockRejectedValue(errorResponse)

    const dispatch = vi.fn()

    await expect(
        asyncSetAuthUser({
        email: 'aka@test.com',
        password: 'salah',
        })(dispatch)
    ).rejects.toThrow('Email atau password salah')

    expect(dispatch).not.toHaveBeenCalled()
    })
})
