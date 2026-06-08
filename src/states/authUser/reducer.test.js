/**
 * Skenario Testing
 *
 * authUserReducer function
 *  - harus mengembalikan authUser ketika menerima action SET_AUTH_USER
 *  - harus mengembalikan null ketika menerima action UNSET_AUTH_USER
 */

import { describe, it, expect } from 'vitest'
import authUserReducer from './reducer'

describe('Fungsi autentication User Reducer' , () => {
  it('harus mengembalikan authUser ketika menerima action SET_AUTH_USER', () => {
    const initialState = null

    const action = {
        type: 'SET_AUTH_USER',
        payload: {
        authUser: {
            id: 'user-1',
            name: 'Aka',
        },
        },
    }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toEqual(action.payload.authUser)
    })

  it('harus mengembalikan null ketika menerima action UNSET_AUTH_USER', () => {
    const initialState = {
        id: 'user-1',
        name: 'Aka',
    }

    const action = {
        type: 'UNSET_AUTH_USER',
    }

    const nextState = authUserReducer(initialState, action)

    expect(nextState).toBeNull()
  })
})
