import React from 'react'
import { act, fireEvent, render , screen, waitFor } from '@testing-library/react'

import * as backendModules from '../../services/backend'

import SimpleForm from './SimpleForm'

const mockedResponse = {
  "id": 3,
  "name": "John Doe",
  "username": "johndoe",
  "email": "johndoe@gmail.com",
  "address": {
      "street": "blah blah",
      "city": "Charlotte",
      "zipcode": "28217-0000",
  },

}


jest.mock('../../services/backend', () => {
  return {
    getUser: jest.fn(() => {
      return new Promise(() => {})
    }),
    saveUser: jest.fn(() => {
      return new Promise(() => {})
    })
  }

})

describe('Simple Form Component', () => {
  beforeEach(() => {
    backendModules.getUser.mockImplementation(() => {
      return Promise.resolve(mockedResponse)
    })
    backendModules.saveUser.mockImplementation(() => {
      return Promise.resolve('success')
    })
  })

  test('renders form with fetched data for given userId', async () => {
    await act(async () => {
      const { container } = await render(<SimpleForm userid={3} />)
    })

    const firstnameInput = screen.getByRole('textbox', {name: "Name"})
    expect(firstnameInput.value).toBe("John Doe")

    const usernameInput = screen.getByRole('textbox', {name: "User Name"})
    expect(usernameInput.value).toBe("johndoe")

    const emailInput = screen.getByRole('textbox', {name: "Email"})
    expect(emailInput.value).toBe("johndoe@gmail.com")

    const streetInput = screen.getByRole('textbox', {name: "Street"})
    expect(streetInput.value).toBe("blah blah")

    const cityInput = screen.getByRole('textbox', {name: "City"})
    expect(cityInput.value).toBe("Charlotte")

    const zipcodeInput = screen.getByRole('textbox', {name: "Zip code"})
    expect(zipcodeInput.value).toBe("28217-0000")
    
  })

  test('able to change values on form and submit form', async () => {
    const spy = jest.spyOn(backendModules, 'saveUser')
    await act(async () => {
      const { container } = await render(<SimpleForm userid={3} />)
    })

    const nameInput = screen.getByRole('textbox', {name: "Name"})
    fireEvent.change(nameInput, {target: {value: 'Jane Doe'}})
    await waitFor(() => expect(nameInput.value).toBe("Jane Doe"))

    const usernameInput = screen.getByRole('textbox', {name: "User Name"})
    fireEvent.change(usernameInput, {target: {value: 'janedoe'}})
    await waitFor(() => expect(usernameInput.value).toBe("janedoe"))

    const emailInput = screen.getByRole('textbox', {name: "Email"})
    fireEvent.change(emailInput, {target: {value: 'janedoe@gmail.com'}})
    await waitFor(() => expect(emailInput.value).toBe("janedoe@gmail.com"))

    const streetInput = screen.getByRole('textbox', {name: "Street"})
    fireEvent.change(streetInput, {target: {value: 'cah cah'}})
    await waitFor(() => expect(streetInput.value).toBe("cah cah"))

    const cityInput = screen.getByRole('textbox', {name: "City"})
    fireEvent.change(cityInput, {target: {value: 'Atlanta'}})
    await waitFor(() => expect(cityInput.value).toBe("Atlanta"))

    const zipcodeInput = screen.getByRole('textbox', {name: "Zip code"})
    fireEvent.change(zipcodeInput, {target: {value: '98650-0000'}})
    await waitFor(() => expect(zipcodeInput.value).toBe("98650-0000"))

    const saveButton = screen.getByRole('button', {name: 'Save'})
    fireEvent.click(saveButton)
    
    await waitFor(() => expect(spy).toBeCalledWith({
      id: 3,
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'janedoe@gmail.com',
      street: 'cah cah',
      city: 'Atlanta',
      zipcode: '98650-0000'
    }))
    
  })


})