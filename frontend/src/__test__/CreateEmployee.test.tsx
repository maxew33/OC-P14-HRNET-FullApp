import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import routesConfig from '../routes/routesConfig'

describe("when I'm on the create employee page", () => {
    const router = createMemoryRouter(routesConfig, {initialEntries:['/']})
     render(
            <RouterProvider router={router}/>
        )

    it('should render the create employee page', () => { 

        expect(screen.getByTestId('createEmployee')).toBeInTheDocument()
    })

    it('should navigate to the employees page when link is clicked', async () => {
       
        const link = screen.getByTestId('link')
        expect(link).toBeInTheDocument()

        fireEvent.click(link)

        // Wait for the ViewEmployees component to be rendered after navigation
        await screen.findByTestId('viewEmployees')

        expect(screen.getByTestId('viewEmployees')).toBeInTheDocument()
    })
})
