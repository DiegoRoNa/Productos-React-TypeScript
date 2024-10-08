import { Product } from "../types"

type ProductFormProps = {
    product?: Product // el "?", dice: "Puede o no haber un producto", ya que estamos reutilizando este componente en editar y crear producto
}

export default function ProductForm({product} : ProductFormProps) {
  return (
    <>
    <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">Nombre Producto:</label>
        <input id="name" name="name" defaultValue={product?.name} type="text" placeholder="Nombre del Producto" className="mt-2 block w-full p-3 bg-gray-50"/>
    </div>
    <div className="mb-4">
        <label className="text-gray-800" htmlFor="price">Precio:</label>
        <input id="price" name="price" defaultValue={product?.price} type="number" placeholder="Precio Producto. ej. 200, 300" className="mt-2 block w-full p-3 bg-gray-50"/>
    </div>
    </>
  )
}
