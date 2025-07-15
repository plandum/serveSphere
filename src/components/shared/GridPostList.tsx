import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { PostStats } from "@/components/shared";
import { useUserContext } from "@/context/AuthContext";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
  maxElements?: number;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
  maxElements = 4,
}: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul
      className={`w-full grid gap-2
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    ${maxElements === 3 ? "lg:grid-cols-3 xl:grid-cols-3" : ""}
    ${maxElements === 4 ? "lg:grid-cols-4 xl:grid-cols-4" : ""}
    ${maxElements === 5 ? "lg:grid-cols-5 xl:grid-cols-5" : ""}
  `}>
      {posts.map((post) => (
        <li
          key={post.$id}
          className={`relative overflow-hidden bg-[#F6F6F6] shadow rounded-2xl ${
            post.wide ? "col-span-2" : ""
          }`}>
          <Link to={`/posts/${post.$id}`} className="block relative">
            {/* Картинка */}
            <img
              src={post.imageUrl}
              alt={post.productName}
              className="w-full h-[196px] object-cover"
            />

            <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium bg-white/30 backdrop-blur-md shadow-sm">
              {post.productCategory}
            </div>

            {/* Иконка избранного */}
            <div className="absolute bottom-2 right-2">
              <img
                src="/assets/icons/star.svg"
                className="w-10 h-10"
                alt="favorite"
              />
            </div>
          </Link>

          <div className="h-36 p-4 flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="text-sm font-medium">{post.productName}</p>

              <div className="flex items-center gap-1 text-sm bg-white w-fit px-[9px] py-[3px] rounded-[50px]">
                <img
                  src="/assets/icons/star-filled.svg"
                  className="w-4 h-4"
                  alt="rating"
                />
                <span className="text-[#3D3BFF] text-xs font-medium">4.8</span>
              </div>
            </div>

            <p className="text-base font-semibold">
              {parseInt(post.productPrice).toLocaleString("ru-RU")} ₽
              <span className="text-sm font-normal">
                {" "}
                {post.priceType == "hourly" ? "(почасово)" : "(Сделка)"}
              </span>
            </p>

            <div className="flex gap-2 text-xs font-light flex-wrap">
              {post.location && (
                <span className="bg-white px-3 py-1 rounded-full">
                  {post.location}
                </span>
              )}
              {showUser && (
                <span className="bg-white px-3 py-1 rounded-full flex items-center gap-1">
                  <img
                    src="/assets/icons/briefcase.svg"
                    className="w-4 h-4"
                    alt="company"
                  />
                  {post.creator.fullName}
                </span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
