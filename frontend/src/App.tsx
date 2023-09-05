import { useAtom } from "jotai"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import routesConfig from "./routes/routesConfig"
import { useEffect, useState } from "react"
import CallData from "./CallData/CallData"
import { employeesAtom } from "./main"

export const App = () => {
    
const router = createBrowserRouter(routesConfig)

const [employees, setEmployees] = useAtom(employeesAtom)

const [dataFetched, setDataFetched] = useState(false)

useEffect(() => {
    if (employees.length === 0) {
        const fetchData = async () => {
            const url = 'https://oc-p14-hr-net-backend-3gvzh5otl-maxew33.vercel.app/api/employees'

            const callData = new CallData(url)

            const employeesData = await callData.getEmployeesData()

            setEmployees([...employees, ...employeesData])
        }
        fetchData()
    }
    setDataFetched(true)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

    return (
        <div>
            {(employees.length !== 0 || dataFetched ) && <RouterProvider router={router} />}
        </div>
    )
}
