
import { Suspense } from "react";

type ProductProps = {
  params: Promise<{
    id: string;
  }>;
};

async function ProductDetails({ params }: ProductProps) {
  const { id } = await params;

  return <h1>Product {JSON.stringify({ id })}</h1>;
}

export default function Product({ params }: ProductProps) {
  return (
    <main>
      <h1>Product Details</h1>

      <Suspense fallback={<p>Loading product...</p>}>
        <ProductDetails params={params} />
      </Suspense>
    </main>
  );
}
