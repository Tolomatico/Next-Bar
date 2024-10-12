"use client"

import { getImagePath } from "@/src/utils";
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image";
import { useState } from "react";




export default function ImageUpload({ image }: { image: string | undefined }) {

    const [imageUrl, setImageUrl] = useState("")

    return (
        <CldUploadWidget
            uploadPreset="f2iqjhgi"
            options={{
                maxFiles: 1
            }}
            onSuccess={(result, { widget }) => {
                if (result.event === "success") {

                    widget.close()
                    // @ts-expect-error: result.info might not have secure_url, but we handle it safely
                    setImageUrl(result.info?.secure_url)
                }
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Imagen Producto</label>
                        <div
                            onClick={() => open()}
                            className="relative cursor-pointer hover:opacity-70 transition-none
     p-10 border-neutral-300 flex flex-col justify-center items-center gap-4
     text-neutral-600 bg-slate-100">




                            {
                                imageUrl ? (
                                    <div className="absolute inset-0 w-full h-full">
                                        <Image
                                            fill
                                            style={{ objectFit: "contain" }}
                                            src={imageUrl}
                                            alt="Image de producto"
                                        />
                                    </div>
                                ) : <p className="text-lg font-semibold">Agregar Imagen</p>
                            }
                        </div>
                    </div>

                    {image && !imageUrl && (
                        <div className="space-y-2">
                            <label>Imagen actual:</label>
                            <div className="relative w-64 h-64">
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt="Imagen producto"
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                        </div>
                    )}

                    <input
                        type="hidden"
                        name="image"
                        defaultValue={imageUrl ? imageUrl : image}
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
