
import { Suspense } from "react";
import { connection } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/src/lib/stripe";
import Home from "./home";

async function Products() {
  await connection();

  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: (price.unit_amount ?? 0) / 100,
    };
  });

  return <Home products={products} />;
}

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando produtos...</p>}>
      <Products />
    </Suspense>
  );
}
