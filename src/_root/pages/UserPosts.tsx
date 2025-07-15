import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetUserById } from "@/lib/react-query/queries";
import { Loader } from "@/components/shared";
import GridPostList from "@/components/shared/GridPostList";

const statusOptions = [
  { label: "Все объявления", value: "all" },
  { label: "На модерации", value: "moderation" },
  { label: "Опубликованные", value: "published" },
  { label: "Неактивные", value: "inactive" },
];

const UserPosts = () => {
  const { id } = useParams();
  const { data: userData, isLoading } = useGetUserById(id || "");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleStatusToggle = (value: string) => {
    if (selectedStatus.includes(value)) {
      setSelectedStatus(selectedStatus.filter((v) => v !== value));
    } else {
      setSelectedStatus([...selectedStatus, value]);
    }
  };

  if (isLoading || !userData)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const filteredPosts = userData.posts.filter((post: any) => {
    if (selectedStatus === "all") return true;
    return post.status === selectedStatus;
  });

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Сайдбар */}
      <div className="w-full flex flex-wrap gap-3">
        {statusOptions.map((option) => (
          <label
            key={option.value}
            className="flex gap-[10px] px-3 py-2 bg-[#F6F6F6] items-center rounded-[10px] ">
            <input
              type="checkbox"
              checked={selectedStatus.includes(option.value)}
              onChange={() => handleStatusToggle(option.value)}
              className="accent-[#3D3BFF]"
            />
            {option.label}
          </label>
        ))}
      </div>

      {/* Список постов */}
      <div className="flex-1 md:pr-[60px]">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-light-3 mt-8">Объявлений нет</p>
        ) : (
          <GridPostList
            posts={filteredPosts}
            showUser={false}
            maxElements={3}
          />
        )}
      </div>
    </div>
  );
};

export default UserPosts;
