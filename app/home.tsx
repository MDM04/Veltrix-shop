"use client";

import { HomeContainer, Product } from "@/src/styles/home";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map((product) => (
        <Product
          as={Link}
          href={`/product/${product.id}`}
          key={product.id}
          className="keen-slider__slide"
        >
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
            loading="eager"
          />

          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  );
}