"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import Image from "next/image";
import { Expand, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import Currency from "./currency";
import usePreviewModal from "@/hooks/use-preview-modal";

import useCart from "@/hooks/use-cart";

type ProductCardProps = {
  data: Product;
};

export default function ProductCard({ data }: ProductCardProps) {
  const router = useRouter();
  const previewModal = usePreviewModal();
  const cart = useCart();

  function handleClick() {
    router.push(`/product/${data?.id}`);
  }

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-stone-50 dark:bg-stone-900 rounded-xl border p-3 space-y-4 cursor-pointer"
    >
      {/* Images and Actions */}
      <div className="group aspect-square rounded-xl bg-stone-200 dark:bg-stone-800 relative">
        <Image
          alt="Image"
          src={data?.images?.[0]?.url}
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-50 absolute transition w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={
                <Expand
                  size={20}
                  className="text-stone-500 dark:text-stone-100"
                />
              }
            />
            <IconButton
              onClick={onAddToCart}
              icon={
                <ShoppingCart
                  size={20}
                  className="text-stone-500 dark:text-stone-100"
                />
              }
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg dark:text-gray-300">{data.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {data.category?.name}
        </p>
      </div>
      <div className="flex items-center justify-between font-semibold">
        {/* {formatter.format(Number(data?.price))} */}
        <Currency value={data.price} />
      </div>
    </div>
  );
}
