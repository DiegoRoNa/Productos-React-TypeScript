

// SCHEMAS Y TYPES CON ZOD Y VALIBOT
import { boolean, number, object, string, InferOutput, array } from "valibot";

// shchema del obj que se manda desde el formulario
export const DraftProductSchema = object({
    name: string(),
    price: number(),
})

// schema del producto que viene desde la BD
export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

// schema del array de productos que viene desde la BD
export const ProductsSchema = array(ProductSchema)

// type del producto
export type Product = InferOutput<typeof ProductSchema>