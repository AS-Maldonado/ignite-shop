import Logo from "@/assets/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";

export default function Header() {
  const { quantity } = useContext(CartContext);
  return (
    <header className="py-4 w-full max-w-[1180px] m-auto my-6 flex justify-between items-center">
      <Link href="/">
        <Image src={Logo} alt="Ignite Shop Logo" />
      </Link>
      <div className="relative">
        <button className="cursor-pointer bg-[#202024] p-3 rounded-md">
          <ShoppingBag className="text-gray300" />
        </button>
        <span className="absolute text-white bg-green300 rounded-full px-2 left-[32px] top-[-5px]">
          {quantity}
        </span>
      </div>
    </header>
  );
}
