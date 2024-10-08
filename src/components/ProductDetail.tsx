import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

type ProdcutDetailProps = {
    product: Product
}

// request, contiene lo que se manda del Form
// params, contiene las variables de la URL
export async function action({params} : ActionFunctionArgs) {
    if (params.id) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export default function ProductDetail({product} : ProdcutDetailProps) {

    const fetcher = useFetcher() // hook para formularios
    const navigate = useNavigate() // hook de navegacion
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800 text-center">{product.name}</td>
            <td className="p-3 text-lg text-gray-800 text-center">{formatCurrency(product.price)}</td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button type="submit" name="id"
                            value={product.id}
                            className={`${isAvailable ? 'text-black hover:text-white' : 'text-red-600 hover:text-red'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black hover:cursor-pointer hover:bg-slate-800`}>
                        {isAvailable ? 'Disponible' : 'No disponible'}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button onClick={() => navigate(`productos/${product.id}/editar`)} className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-500">
                        Editar
                    </button>
                    
                    <Form className="w-full" method="POST" 
                            onSubmit={(e) => {
                                if (!confirm(`Deseas eliminar el producto "${product.name}"`)) {
                                    e.preventDefault()
                                }
                            }}
                            action={`productos/${product.id}/eliminar`}>
                        <input type="submit" value="Eliminar" className="bg-red-600 cursor-pointer text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-red-500"/>
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
