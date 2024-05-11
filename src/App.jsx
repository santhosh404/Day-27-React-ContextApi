import { CartContextProvider } from "./contexts/CartContext";
import { Route, Routes } from 'react-router-dom';
import { routes } from "./routes";


function App() {

  return (
    <>
      <CartContextProvider>
        <Routes>
          {
            routes.map((route, idx) => <Route key={idx} path={route.path} element={<route.element />} />)
          }
        </Routes>
      </CartContextProvider>
    </>
  )
}

export default App
