import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import routesConfig from '../routes/routesConfig'

describe("when I'm on the create employee page", () => {
    const router = createMemoryRouter(routesConfig, {initialEntries:['/view']})
     render(
            <RouterProvider router={router}/>
        )

    it('should render the view employees page', () => { 
        expect(screen.getByTestId('viewEmployees')).toBeInTheDocument()
    })

    it('should navigate to the create employee page when link is clicked', async () => {
       
        const link = screen.getByTestId('link')
        expect(link).toBeInTheDocument()

        fireEvent.click(link)

        // Wait for the ViewEmployees component to be rendered after navigation
        await screen.findByTestId('createEmployee')

        expect(screen.getByTestId('createEmployee')).toBeInTheDocument()
    })
})
