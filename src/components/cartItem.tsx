import { CartContext } from "@/context/cartContext";
import Image from "next/image";
import { useContext } from "react";

interface CartItemProps {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number;
}

export default function CartItem({
  id,
  name,
  imageUrl,
  price,
  quantity,
}: CartItemProps) {
  const { removeFromCart } = useContext(CartContext);
  const formatedPrice = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <div className="flex mb-6">
      <div className="product-img-container rounded-lg">
        <Image
          src={imageUrl}
          alt={`${name} Image`}
          width={100}
          height={90}
          className="rounded-lg"
        />
      </div>
      <div className="ml-5">
        <p className="text-gray-200">{name}</p>
        <p className="text-xs text-gray300 italic">Quantidade: {quantity}</p>
        <strong className="text-white block font-bold mb-2 mt-1">
          R$ {formatedPrice}
        </strong>
        <button
          className="text-green300 font-bold hover:text-green500 hover:underline cursor-pointer"
          onClick={() => removeFromCart(id)}
        >
          Remover
        </button>
      </div>
    </div>
  );
}
