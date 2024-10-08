import { safeParse, pipe, unknown, transform, parse } from "valibot"
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import axios from "axios"
import { toBoolean } from "../utils"

type ProductData = {
    [k: string]: FormDataEntryValue
}

/**
 * Funcion para enviar los datos del nuevo producto a la api
 * @param data Datos del form
 */
export async function addProduct(data : ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Los datos no son válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * Funcion para obtener los productos desde la api
 * @returns Array de productos
 */
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios(url)

        const result = safeParse(ProductsSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('No fue posible obtener los productos')
        }

    } catch (error) {
        console.log(error)
    }
}

/**
 * Funcion para mandar el producto a editar a la api
 * @param id ID del producto para obtener su info
 * @returns 
 */
export async function getProductById(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url)

        const result = safeParse(ProductSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('No fue posible obtener el producto')
        }

    } catch (error) {
        console.log(error)
    }
}

/**
 * Funcion para editar un producto a la api
 * @param data Datos del form
 * @param id ID del producto a editar
 */
export async function updateProduct(data : ProductData, id : Product['id']) {
    try {
        // forzar un dato convertirse a numero
        const NumberSchema = pipe(unknown(), transform(Number))

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)
        } else {
            throw new Error('No fue posible actualizar el producto')
        }

    } catch (error) {
        console.log(error)
    }
}

/**
 * Funcion para eliminar un producto
 * @param id ID del producto a eliminar
 */
export async function deleteProduct(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

/**
 * Funcion para eliminar un producto
 * @param id ID del producto a editar su disponibilidad
 */
export async function updateProductAvailability(id : Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}