import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({request} : ActionFunctionArgs) { // request, contiene lo que se manda del Form

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
    await addProduct(data)

    // el action siempre debe retornar algo en pantalla o redireccionar
    return redirect('/') // funcion para redireccionar
}

export default function NewProduct() {

    // Recuperar lo que retorna la funcion action
    const error = useActionData() as string // "useActionData", contiene el return de la function action

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar producto</h2>
                <Link to="/" className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">Volver a productos</Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className="mt-10" method="POST">
                <ProductForm/>
                
                <input type="submit" value="Registrar Producto" className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"/>
            </Form>
        </>
    )
}
