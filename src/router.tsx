import { createBrowserRouter } from "react-router-dom"
import Layout from "./layouts/Layout"
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products"
import NewProduct, { action as newProductAction } from "./views/NewProduct"
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./views/EditProduct"
import { action as deleteProductAction } from "./components/ProductDetail"

export const router = createBrowserRouter(
    [
        {
            path: '/', // ruta principal
            element: <Layout/>,
            children: [ // hijos de "element"
                {
                    index: true, // elemento hijo inicial
                    element: <Products/>,
                    loader: productsLoader, // Aqui al cargar la pagina, obtendrá los productos
                    action: updateAvailabilityAction // Aqui se conecta el Form, con la funcion para el action
                },
                {
                    path: 'productos/nuevo',
                    element: <NewProduct/>,
                    action: newProductAction // Aqui se conecta el Form, con la funcion para el action
                },
                {
                    path: 'productos/:id/editar', // ROA pattern - Resource Oriented Design
                    element: <EditProduct/>,
                    loader: editProductLoader, // Aqui al cargar la pagina, obtendra el producto a editar
                    action: editProductAction // Aqui se conecta el Form, con la funcion para el action
                },
                {
                    path: 'productos/:id/eliminar', // ROA pattern - Resource Oriented Design
                    action: deleteProductAction // Aqui se conecta el Form, con la funcion para el action
                }
            ]
        }
    ],
    {
        basename: '/productosReact/' // quitar en desarrollo
    }
)