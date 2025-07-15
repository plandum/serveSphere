import { useGetPosts } from "@/lib/react-query/queries";
import { GridPostList, Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/appwrite/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FilterModal from "@/components/shared/FilterModal";

const Home23 = () => {
  const { data: allPosts, isLoading } = useGetPosts();
  const [categories, setCategories] = useState<any[]>([]);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  }

  if (
    !allPosts ||
    allPosts.pages.length === 0 ||
    allPosts.pages[0].documents.length === 0
  ) {
    return (
      <div className="flex-center w-full h-full">
        <p className="text-light-3 text-lg">No products found.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex gap-4 items-center">
        {/* <Button variant="secondary">Товары</Button> */}
        <div className="flex gap-[6px] items-center">
          <Button className="bg-[#3D3BFF] text-center text-white px-[44px] py-2 rounded-[20px]">
            Услуги
          </Button>

          <button
            onClick={() => setOpenFilter(true)}
            className="w-[41px] h-[34px] flex items-center justify-center border rounded-[20px]">
            <img src="/public/assets/icons/filter.svg" alt="" />
          </button>
          <FilterModal
            isOpen={openFilter}
            onClose={() => setOpenFilter(false)}
          />
        </div>
        <Link className="ml-auto text-[#3D3BFF]" to={"/create-product"}>
          + Создать <br /> объявление
        </Link>
      </div>
      <div className="flex flex-wrap gap-2 mt-6 mb-14">
        {categories.map((cat) => (
          <Link
            to={`/category/${cat.$id}`}
            key={cat.$id}
            className="w-[163px] h-[60px] relative bg-[#F6F6F6] rounded-[10px] px-[14px] py-[6px] text-start overflow-hidden">
            <p className="max-w-[74px]">{cat.title}</p>

            <img
              src={`${cat.image}`}
              alt={`${cat.title}`}
              className="absolute right-0 bottom-0"
            />
          </Link>
        ))}
      </div>

      {allPosts.pages.map((page, index) => (
        <GridPostList
          key={`page-${index}`}
          posts={page.documents}
          showUser={true}
          maxElements={4}
        />
      ))}
    </div>
  );
};

export default Home23;
