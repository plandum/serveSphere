import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getCategoryById, getPostsByCategory } from "@/lib/appwrite/api";
import { Loader, GridPostList } from "@/components/shared";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const category = await getCategoryById(id || "");
      const posts = await getPostsByCategory(id || "");
      setCategory(category);
      setPosts(posts);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-10">
      <div className="flex">
        {/* <button>Товары</Button> */}
        <button className="bg-[#3D3BFF] text-white px-[42px] py-[7px] rounded-[20px]">
          Услуги
        </button>

        <button className="rounded-full border border-black w-[41px] h-[34px] flex items-center justify-center ml-[6px]">
          <img src="/assets/icons/filter.svg" alt="" />
        </button>
        <Button className="ml-auto text-[#3D3BFF]" variant="link">
          + Создать <br /> объявление
        </Button>
      </div>
      <p className="flex flex-row gap-3 mt-11">
        <Link className="text-[#7A7A7A]" to={`/`}>
          Услуги
        </Link>{" "}
        <span className="flex items-center justify-center w-[22px] h-[22px] bg-[#F6F6FF] text-[#6377EE] p-1 rounded-full">
          ›
        </span>{" "}
        <span>{category?.title}</span>
      </p>

      <div className="w-full flex flex-wrap gap-3 mt-5">
        <label className="flex gap-[10px] px-3 py-2 bg-[#F6F6F6] items-center rounded-[10px] ">
          <input type="checkbox" className="accent-[#3D3BFF]" />
          Маникюр и педикюр
        </label>
      </div>
      <div className="mt-14">
        <GridPostList posts={posts} />
      </div>
    </div>
  );
};

export default CategoryPage;
