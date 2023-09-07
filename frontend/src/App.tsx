import { useAtom } from 'jotai'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routesConfig from './routes/routesConfig'
import { useEffect, useState } from 'react'
import CallData from './CallData/CallData'
import { employeesAtom } from './main'

export const App = () => {
    const router = createBrowserRouter(routesConfig)

    const [employees, setEmployees] = useAtom(employeesAtom)

    const [dataFetched, setDataFetched] = useState(false)

    useEffect(() => {
        if (employees.length === 0) {
            const fetchData = async () => {
                const url =
                    'https://oc-p14-hrnet-full-app-git-main-maxew33.vercel.app/api/employees'

                const callData = new CallData(url)

                const employeesData = await callData.getEmployeesData()

                // delete the "_id" attribute given by mongodb
                const employeesWithoutId = employeesData.map(
                    (employee: {
                        [x: string]: string | number | Date
                        _id: string | number
                        __v: string | number
                    }) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { _id, __v, ...rest } = employee
                        return rest
                    }
                )

                setEmployees([...employees, ...employeesWithoutId])
            }
            fetchData()
        }
        setDataFetched(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {(employees.length !== 0 || dataFetched) && (
                <RouterProvider router={router} />
            )}
        </>
    )
}
