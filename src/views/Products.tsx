import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom"
import { getProducts, updateProductAvailability } from "../services/ProductService"
import ProductDetail from "../components/ProductDetail"
import { Product } from "../types"

export async function action({request} : ActionFunctionArgs) {
    
    const data = Object.fromEntries(await request.formData()) // obtener datos del formulario
    
    // actualizar disponibilidad desde la api
    await updateProductAvailability(+data.id)

    return {}
}

export async function loader() {
    
    // obtener productos de la api
    const products = await getProducts()

    return products
}

export default function Products() {

    // productos desde la funcion loader
    const products = useLoaderData() as Product[] // type de product

    return (
        <>
        <div className="flex justify-between">
            <h2 className="text-4xl font-black text-slate-500">Productos</h2>
            <Link to="productos/nuevo" className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">Agregar producto</Link>
        </div>

        <div className="p-2">
            <table className="w-full mt-5 table-auto">
                <thead className="bg-slate-800 text-white">
                    <tr>
                        <th className="p-2">Producto</th>
                        <th className="p-2">Precio</th>
                        <th className="p-2">Disponibilidad</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <ProductDetail key={product.id} product={product}/>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
