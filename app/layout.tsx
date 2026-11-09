import { getCssText } from "@/src/styles";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { globalStyles } from "@/src/styles/global";
import { Container, Header } from "@/src/styles/pages/app";
import Image from "next/image";

globalStyles();


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Veltrix Shop",
  description: "Sua loja virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </head>
      <body className={`${roboto.className} min-h-full flex flex-col`}>
        <Container>
          <Header>
            <Image
              src="/veltrix-shop.svg"
              alt="Veltrix Shop"
              width={150}
              height={70}
              loading="eager"
            />
          </Header>

          {children}
        </Container>
      </body>
    </html>
  );
}