import CreateEmployee from "../pages/CreateEmployee/CreateEmployee";
import ViewEmployees from "../pages/ViewEmployees/ViewEmployees";

const routesConfig = [
  {
    path: "/",
    element: <CreateEmployee/>
  },
  {
    path: "/view",
    element: <ViewEmployees/>
  }
]
  
  export default routesConfig;