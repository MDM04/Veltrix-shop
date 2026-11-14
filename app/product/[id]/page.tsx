import { Suspense } from "react";
import { cacheLife } from "next/cache";
import Stripe from "stripe";
import { stripe } from "@/src/lib/stripe";
import Product from "./product";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getProduct(id: string) {
  "use cache";

  cacheLife({
    revalidate: 60 * 60, // 1 hora
  });

  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price.unit_amount! / 100),
    description: product.description,
  };
}

async function ProductDetails({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await getProduct(id);

  return <Product product={product} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense fallback={<p>Carregando produto...</p>}>
      <ProductDetails params={params} />
    </Suspense>
  );
}