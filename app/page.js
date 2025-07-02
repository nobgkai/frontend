import Image from "next/image";
import Link from "next/link";
import Carousel from "./components/carousel";
import Card from "./components/Card";
export default function Home() {
  return (
    <>
      <Carousel />
      <Card />
    </>
  );
}
