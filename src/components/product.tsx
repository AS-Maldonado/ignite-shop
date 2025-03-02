import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  href: string;
}

export default function Product({ name, price, imageUrl, href }: ProductProps) {
  return (
    <Link
      href={href}
      className="product rounded-lg p-1 cursor-pointer relative flex items-center justify-center object-cover"
    >
      <Image src={imageUrl} alt="" width={520} height={480} />
      <footer className="bottom-1 left-1 right-1 absolute rounded-md flex items-center justify-between bg-[#202024] p-8">
        <strong className="text-lg text-white">{name}</strong>
        <span className="text-xl font-bold text-green-300">{price}</span>
      </footer>
    </Link>
  );
}
