import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imagemUrl: string;
  };
}

export default function SuccessPage({ customerName, product }: SuccessProps) {
  return (
    <main className="flex flex-col items-center justify-center m-auto h-[656px]">
      <h1 className="text-gray100 text-2xl">Compra efetuada!</h1>
      <div className="success-img-container mt-16 w-full max-w-[130px] h-[145px] rounded-lg p-1 flex items-center justify-center object-cover">
        <Image src={product.imagemUrl} alt="" width={130} height={145} />
      </div>
      <p className="text-xl text-gray300 max-w-[560px] text-center mt-8">
        Uhuul <strong>{customerName}</strong>, sua{" "}
        <strong>{product.name}</strong> já está a caminho da sua casa.{" "}
      </p>

      <Link
        href={"/"}
        className="mt-20 block text-lg text-green500 font-bold hover:text-green300"
      >
        Voltar ao catalogo
      </Link>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<SuccessProps> = async ({
  query,
}) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details?.name ?? "";
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product && product.name,
        imagemUrl: product && product.images[0],
      },
    },
  };
};
