import HomeContainer from "@/components/homeContainer";
import Product from "@/components/product";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { stripe } from "@/lib/stripe";
import { ProductType } from "@/types/product";
import { GetStaticProps } from "next";
import Stripe from "stripe";

interface HomeProps {
  products: ProductType[];
}

export default function Home(props: HomeProps) {
  return (
    <HomeContainer>
      <Carousel>
        <CarouselContent>
          {props.products.map((product) => (
            <CarouselItem className="basis-1/3" key={product.id}>
              <Product
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                href={`/product/${product.id}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </HomeContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products: ProductType[] = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price.unit_amount ? price.unit_amount / 100 : 0),
    };
  });

  return {
    props: {
      products: products,
    },
    revalidate: 60 * 60 * 1, //1 Hora
  };
};
