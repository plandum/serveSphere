import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGetUserById } from "@/lib/react-query/queries";
import { Loader } from "@/components/shared";
import GridPostList from "@/components/shared/GridPostList";

const favorites = () => {
  const { id } = useParams();
  const { data: userData, isLoading } = useGetUserById(id || "");

  if (isLoading || !userData)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Список постов */}
      <div className="flex-1 md:pr-[60px]">
        {userData.liked.length === 0 ? (
          <p className="text-center text-light-3 mt-8">Объявлений нет</p>
        ) : (
          <GridPostList
            posts={userData.liked}
            showUser={false}
            maxElements={3}
          />
        )}
      </div>
    </div>
  );
};

export default favorites;
