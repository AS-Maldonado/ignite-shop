import { CartContext } from "@/context/cartContext";
import { X } from "lucide-react";
import { useContext } from "react";
import CartItem from "./cartItem";

export default function Cart() {
  const { cart, quantity } = useContext(CartContext);

  if (cart.length === 0 || !cart) return;

  const allPrices = cart.map((item) => item.price * (item.quantity ?? 1));
  const totalPrice = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(allPrices.reduce((total, price) => total + price, 0));

  return (
    <div className="min-w-[480px] absolute top-0 right-0 z-10 px-12 flex flex-col justify-between h-full bg-[#202024]">
      <div className="w-full flex justify-end p-5 cursor-pointer">
        <X className="text-gray300" />
      </div>
      <h2 className="text-white mb-8 text-lg">Sacola de compras</h2>
      <div className="overflow-y-scroll h-[500px]">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            quantity={item.quantity}
          />
        ))}
      </div>

      <div className="my-10">
        <div className="w-full flex items-center justify-between my-1">
          <p className="text-gray300 text-sm">Quantidade:</p>
          <p className=" text-gray300 text-sm">
            {quantity} {quantity > 1 ? "Items" : "Item"}
          </p>
        </div>
        <div className="w-full flex items-center justify-between my-1">
          <p className="text-gray-100 font-bold">Valor Total:</p>
          <p className=" text-gray-100 text-2xl font-bold">R$ {totalPrice}</p>
        </div>
        <button className="w-full mt-12 bg-green500 border-0 text-white rounded-lg p-5 cursor-pointer font-bold text-md hover:bg-green300">
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
