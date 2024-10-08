import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductById, updateProduct } from "../services/ProductService"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

// usamos el loader, ya que puede ser una url que se puede compartir
export async function loader({params} : LoaderFunctionArgs) { // params contiene las variables de la URL
    
    // mandar producto a editar
    if (params.id) {
        const product = await getProductById(+params.id)

        // validar si el producto existe
        if (!product) {
            return redirect('/')
            // throw new Response('', { status: 404, statusText: 'El producto no existe' })
        }

        return product
    }

    return redirect('/')

}

// request, contiene lo que se manda del Form
// params, contiene las variables de la URL
export async function action({request, params} : ActionFunctionArgs) { 

    const data = Object.fromEntries(await request.formData()) // obtener datos del formulario
    
    // validar campos
    let error = ''
    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }

    if (error.length) {
        return error
    }

    // mandar datos a la api para guardar el producto
    if (params.id) {
        await updateProduct(data, +params.id)
    }
    // el action siempre debe retornar algo en pantalla o redireccionar
    return redirect('/') // funcion para redireccionar
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
 ]

export default function EditProduct() {

    // Recuperar el producto a editar
    const product = useLoaderData() as Product

    // Recuperar lo que retorna la funcion action
    const error = useActionData() as string // "useActionData", contiene el return de la function action

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar producto</h2>
                <Link to="/" className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">Volver a productos</Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className="mt-10" method="POST">
                <ProductForm product={product}/>

                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="availability">Disponibilidad:</label>
                    <select id="availability" name="availability" className="mt-2 block w-full p-3 bg-gray-50"
                            defaultValue={product?.availability.toString()}>
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>
                
                <input type="submit" value="Guardar cambios" className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"/>
            </Form>
        </>
    )
}
