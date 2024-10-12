import { useStore } from "@/src/store/store"
import { OrderItem } from "@/src/types"
import { formatCurrency } from "@/src/utils"
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useMemo } from "react"

type ProductDetailsProps={
    item:OrderItem
}

const MAX_ITEMS=5
const MIN_ITEMS=1

export default function ProductDetails({item}:ProductDetailsProps) {
  
  const removeItem=useStore(state=>state.removeItem)
  const increseQuantity=useStore(state=>state.increseQuantity)
  const decreseQuantity=useStore(state=>state.decreseQuantity)
  const disableDecreseQuantity=useMemo(()=>item.quantity === MIN_ITEMS,[item])
  const disableIncreseQuantity=useMemo(()=>item.quantity === MAX_ITEMS,[item])
  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
    <div className="space-y-4">
      <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>
  
          <button
            type="button"
            onClick={() => removeItem(item.id)}
          >
            <XCircleIcon className="text-red-600 h-8 w-8"/>
          </button>
      </div>
      <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
      </p>
      <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            type="button"
            className="disabled:opacity-20"
            onClick={() => decreseQuantity(item.id)}
            disabled={disableDecreseQuantity}
          >
              <MinusIcon className="h-6 w-6"/>
          </button>
  
          <p className="text-lg font-black">
            {item.quantity}
          </p>
  
          <button
             type="button"
             className="disabled:opacity-20"
             onClick={() => increseQuantity(item.id)}
             disabled={disableIncreseQuantity}
          >
              <PlusIcon className="h-6 w-6"/>
          </button>
      </div>
      <p className="text-xl font-black text-gray-700">
          Subtotal: {item.subtotal}
          <span className="font-normal"> 
  
          </span>
      </p>
    </div>
  </div>
  )
}
