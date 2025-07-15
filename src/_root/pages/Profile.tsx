import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";

import { Button } from "@/components/ui";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { Loader } from "@/components/shared";
import { useEffect, useState } from "react";

import UserPosts from "./UserPosts";
import Favorites from "./Favorites";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [patronymic, setPatronymic] = useState("");

  const { data: currentUser, isLoading } = useGetUserById(id || "");

  useEffect(() => {
    if (currentUser) {
      let splitName = currentUser.fullName?.split(" ") || [];

      setLastName(splitName[0]);
      setFirstName(splitName[1]);
      setPatronymic(splitName[2]);
    }
  }, [currentUser]);

  if (isLoading || !currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row gap-[86px] w-full max-w-7xl mx-auto mt-10">
      <div className="w-full md:w-[155px] flex flex-col gap-3">
        <Link
          to={`/profile/${id}`}
          className={`w-full py-2 px-4 rounded-full border border-[#D9D9D9] text-nowrap text-sm font-light text-center ${pathname != `/profile/${id}` ? "hover:bg-[#f0f0f0]" : ""} transition ${pathname === `/profile/${id}` ? "bg-[#3D3BFF] text-white border-transparent hover:bg-[#3D3BFF]/90 font-medium" : ""}`}>
          Личные данные
        </Link>
        <Link
          to={`/profile/${id}/posts`}
          className={`w-full py-2 px-4 rounded-full border border-[#D9D9D9] text-nowrap text-sm font-light text-center ${!pathname.includes("posts") ? "hover:bg-[#f0f0f0]" : ""} transition ${pathname.includes("posts") ? "bg-[#3D3BFF] text-white border-transparent hover:bg-[#3D3BFF]/90 font-medium" : ""}`}>
          Мои объявления
        </Link>
        <Link
          to={`/profile/${id}/favorites`}
          className={`w-full py-2 px-4 rounded-full border border-[#D9D9D9] text-nowrap text-sm font-light text-center ${!pathname.includes("favorites") ? "hover:bg-[#f0f0f0]" : ""} transition ${pathname.includes("favorites") ? "bg-[#3D3BFF] text-white border-transparent hover:bg-[#3D3BFF]/90 font-medium" : ""}`}>
          Избранное
        </Link>
      </div>
      {pathname === `/profile/${id}` && (
        <form className="bg-gray-50 p-10 rounded-xl flex flex-col gap-6 flex-1 shadow">
          <h1 className="text-xl font-semibold">Основная информация</h1>
          <div className="flex flex-col items-center gap-3">
            <p className="text-[#909090]">Фото профиля:</p>
            {currentUser.imageUrl ? (
              <div className="relative">
                <img
                  src={currentUser.imageUrl}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <div className="flex absolute bottom-1 left-0 right-0 justify-center z-10">
                  <img
                    src="/assets/icons/camera.svg"
                    alt=""
                    className="w-8 h-8"
                  />
                </div>
              </div>
            ) : (
              <label className="cursor-pointer bg-primary bg-[#3D3BFF] rounded-[80px] text-white px-11 py-2 ">
                + Загрузить фото
                <input type="file" className="hidden" />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-6">
            <div className="grid grid-cols-2">
              <label className="text-[#909090]">Имя:</label>
              <input
                type="text"
                defaultValue={firstName || ""}
                className="w-full h-[38px] px-[18px] py-[10px] bg-white rounded-[80px]"
              />
            </div>
            <div className="grid grid-cols-2">
              <label className="text-[#909090]">Телефон:</label>
              <input
                type="tel"
                defaultValue={currentUser.phone}
                className="w-full h-[38px] px-[18px] py-[10px] bg-white rounded-[80px]"
              />
            </div>

            <div className="grid grid-cols-2">
              <label className="text-[#909090]">Фамилия:</label>
              <input
                type="text"
                defaultValue={lastName || ""}
                className="w-full h-[38px] px-[18px] py-[10px] bg-white rounded-[80px]"
              />
            </div>
            <div className="grid grid-cols-2">
              <label className="text-[#909090]">Email:</label>
              <input
                type="email"
                defaultValue={currentUser.email}
                className="w-full h-[38px] px-[18px] py-[10px] bg-white rounded-[80px]"
              />
            </div>

            <div className="grid grid-cols-2">
              <label className="text-[#909090]">Отчество:</label>
              <input
                type="text"
                defaultValue={patronymic || ""}
                className="w-full h-[38px] px-[18px] py-[10px] bg-white rounded-[80px]"
              />
            </div>
            <div className="grid grid-cols-2">
              <label className="text-[#909090]">День рождения:</label>
              <input
                type="date"
                defaultValue={currentUser.birthdate}
                className="w-full h-[38px] px-[18px] py-[10px] bg-white rounded-[80px]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-[227px] h-[46px] mx-auto flex justify-center items-center bg-[#3D3BFF] rounded-[80px] text-white mt-[27px]">
            Сохранить
          </button>
        </form>
      )}

      <Routes>
        <Route path="posts" element={<UserPosts />} />
        <Route path="favorites" element={<Favorites />} />
      </Routes>

      <Outlet />
    </div>
  );
};

export default Profile;
