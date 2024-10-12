"use client"

import { SearchSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function ProductSearchForm() {

    const router=useRouter()
    const handleSearch = (formdata: FormData) => {

            const data={
                search:formdata.get("search")
            }

            const result=SearchSchema.safeParse(data)
            if(!result.success){
                result.error.issues.forEach(issue=>{
                    toast.error(issue.message)
                })
                return
            }

            router.push(`/admin/products/search?search=${data.search}`)
    }

    return (
        <form
            className="flex items-center "
            action={handleSearch}
        >

            <input
                type="text"
                placeholder="Buscar Producto"
                className="p-2 placeholder-gray-400 w-full"
                name="search"
            />

            <input
                type="submit"
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
                value={"Buscar"}
            />


        </form>
    )
}
