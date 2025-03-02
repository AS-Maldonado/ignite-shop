import { stripe } from "@/lib/stripe";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";

interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  priceId: string;
  description: string | null;
}

export default function ProductPage({
  name,
  imageUrl,
  price,
  priceId,
  description,
}: ProductProps) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  async function HandleBuyProduct() {
    try {
      const response = await axios.post("/api/checkout", {
        priceId: priceId,
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      alert("Falha ao redirecionar ao Checkout: " + err);
    }
  }

  return (
    <div className="grid grid-cols-2 items-stretch gap-16 max-w-[1180px] m-auto">
      <div className="product-img-container w-full max-w-[576px] h-[656px] rounded-lg p-1 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={`${name} Image`}
          className="object-cover"
          width={576}
          height={656}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl text-gray300">{name}</h1>
        <span className="mt-4 block text-2xl text-green300">{price}</span>
        <p className="mt-7 text-md text-gray300">{description}</p>

        <button
          onClick={HandleBuyProduct}
          className="mt-auto bg-green500 border-0 text-white rounded-lg p-5 cursor-pointer font-bold text-md hover:bg-green300"
        >
          Comprar Agora
        </button>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "prod_Rrk2SeWkSNHpTh" } },
      { params: { id: "prod_Rrk1n62relXoSE" } },
      { params: { id: "prod_Rrk0Az8i8vYYh2" } },
      //   { params: { id: "prod_RrjzwaZsgrzSHM" } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  ProductProps,
  { id: string }
> = async ({ params }) => {
  const productId = params ? params.id : "";
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  const price = product.default_price as Stripe.Price;

  return {
    props: {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      priceId: price.id,
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
      description: product.description,
    },
    revalidate: 60 * 60 * 1, //1 Hora
  };
};
