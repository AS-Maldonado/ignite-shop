import { CartContext } from "@/context/cartContext";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

interface ProductProps {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  href: string;
}

export default function Product({
  id,
  name,
  price,
  imageUrl,
  href,
}: ProductProps) {
  const { addToCart } = useContext(CartContext);
  const product = {
    id,
    name,
    price,
    imageUrl,
  };

  return (
    <div className="relative">
      <Link
        href={href}
        className="product rounded-lg p-1 cursor-pointer flex items-center justify-center object-cover"
      >
        <Image src={imageUrl} alt="" width={520} height={480} />
      </Link>
      <footer className="absolute bottom-1 left-1 right-1 rounded-md flex items-center justify-between bg-[#202024] py-4 px-8">
        <div>
          <strong className="text-lg text-white">{name}</strong>
          <span className="block text-xl font-bold text-green300">{price}</span>
        </div>
        <button
          className="cursor-pointer bg-green500 p-3 rounded-md"
          id="add-to-cart"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag className="text-white" />
        </button>
      </footer>
    </div>
  );
}
