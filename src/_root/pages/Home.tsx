import { Card, CardContent } from "@/components/ui/cardComponent2.tsx";
import { useEffect, useState } from "react";

const products = [
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  {
    title: "Зеленый топ",
    price: "$12.00",
    location: "Glendale, CA",
    image: "/img/top.jpg",
  },
  {
    title: "Nike Air Max",
    price: "$45.00",
    location: "Los Angeles, CA",
    image: "/img/nike.jpg",
  },
  {
    title: "Наушники",
    price: "$9.00",
    location: "Burbank, CA",
    image: "/img/headphones.jpg",
  },
  {
    title: "Котик лежит",
    price: "$0.00",
    location: "Free",
    image: "/img/cat.jpg",
  },
  // добавь остальные товары по аналогии
];

const Home = () => {
  const [visibleCount, setVisibleCount] = useState(20); // Сколько карточек видно
  const [loading, setLoading] = useState(false);

  // Загрузка ещё карточек при скролле
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const fullHeight = document.body.offsetHeight;

    if (scrollTop + windowHeight >= fullHeight - 200 && !loading) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 20); // Загружаем ещё 20
        setLoading(false);
      }, 500); // Можно заменить на API или задержку
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="bg-white w-screen h-screen px-6 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {products.slice(0, visibleCount).map((prod, i) => (
          <Card
            key={i}
            className="overflow-hidden aspect-square bg-gray-100 shadow-lg rounded-xl">
            <img
              src={prod.image}
              alt={prod.title}
              className="w-full h-1/2 object-cover"
            />
            <CardContent className="p-1 h-1/2 flex flex-col justify-between">
              <h2 className="font-semibold text-base">{prod.title}</h2>
              <p className="text-base text-gray-700">{prod.price}</p>
              <p className="text-sm text-gray-500">{prod.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Лоадер или конец списка */}
      {visibleCount < products.length && (
        <p className="text-center mt-4 text-gray-500">Loading ...</p>
      )}
    </div>
  );
};
export default Home;
