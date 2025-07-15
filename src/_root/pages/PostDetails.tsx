import { useParams, useNavigate, Link } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from "@/lib/react-query/queries";
import { Loader, GridPostList } from "@/components/shared";
import { Button } from "@/components/ui";

import PurpleStar from "../../../public/assets/icons/star.svg";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const relatedPosts = userPosts?.documents.filter((p) => p.$id !== id);

  const handleDeletePost = () => {
    deletePost({ productId: id, imageId: post?.imageId });
    navigate(-1);
  };

  if (isLoading || !post) return <Loader />;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 mt-10">
      <p className="flex flex-row gap-3 mb-9">
        <Link className="text-[#7A7A7A]" to={`/`}>
          Услуги
        </Link>{" "}
        <span className="flex items-center justify-center w-[22px] h-[22px] bg-[#F6F6FF] text-[#6377EE] p-1 rounded-full">
          ›
        </span>{" "}
        <Link to={"/category/686ba5550031fd69ce27"} className="text-[#7A7A7A]">
          Outdoor trimming
        </Link>
        <span className="flex items-center justify-center w-[22px] h-[22px] bg-[#F6F6FF] text-[#6377EE] p-1 rounded-full">
          ›
        </span>{" "}
        <span>{post?.productName}</span>
      </p>
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full">
          <img
            src={post.imageUrl}
            className="rounded-[20px] w-full h-[460px] object-cover"
          />
          <div className="flex gap-2 mt-3">
            {[...Array(3)].map((_, i) => (
              <img
                key={i}
                src={post.imageUrl}
                className="w-[90px] h-[65px] object-cover rounded-[6px]"
              />
            ))}
          </div>

          <div className="mt-8 bg-[#F9F9F9] p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">Описание</h3>
            <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
              <li>Сделаем Ваш газон красивым и здоровым</li>
              <li>
                Весенняя восстановительная стрижка газона, удаление мха и
                сорняков
              </li>
              <li>Используем только профессиональное оборудование</li>
            </ul>
            <div className="mt-4 text-sm text-[#909090]">
              Выполнено заказов: <span className="text-black">117</span>
            </div>
            <div className="w-fit px-2 py-1 flex items-center gap-1 text-sm text-[#3D3BFF] mt-5 bg-white rounded-[50px]">
              <img src="/public/assets/icons/star-filled.svg" alt="" />{" "}
              <span>4.8</span>
            </div>
          </div>

          <div className="mt-6 bg-[#F9F9F9] p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-semibold">Условия сотрудничества</h3>
            <ul className="list-disc ml-5 text-sm space-y-1 text-gray-700">
              <li>
                Осуществляем газоны как на постоянной основе, так и разово
              </li>
              <li>Используем технику STIHL, HUSQVARNA и т.д.</li>
              <li>Возможно заключение договора на услугу</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">Оплата</h3>
            <ul className="flex gap-2">
              <li className="w-fit px-2 py-1 flex items-center gap-[10px] text-sm text-black mt-5 bg-white rounded-[50px]">
                <div>
                  <img src="/public/assets/icons/check.svg" alt="" />
                </div>
                Почасовая оплата
              </li>
              <li className="w-fit px-2 py-1 flex items-center gap-[10px] text-sm text-black mt-5 bg-white rounded-[50px]">
                <div>
                  <img src="/public/assets/icons/check.svg" alt="" />
                </div>
                Наличными
              </li>
              <li className="w-fit px-2 py-1 flex items-center gap-[10px] text-sm text-black mt-5 bg-white rounded-[50px]">
                <div>
                  <img src="/public/assets/icons/check.svg" alt="" />
                </div>
                Банковским переводом
              </li>
            </ul>
            <ul className="flex flex-col gap-5">
              <li className="text-sm">Стоимость 1 часа работы - 1500 ₽</li>
              <li className="text-sm">Выезд от 3х часов</li>
              <li className="text-sm">
                Заключаем договор на услуги, 100% постоплата
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-[335px]">
          <h1 className="text-2xl">{post.productName || "Название услуги"}</h1>
          <p className="text-[26px] font-semibold mt-[22px] mb-[22px]">
            {post.productPrice} ₽/час
          </p>
          <p className="text-sm">
            Уход за Вашим газоном с использованием знаний, опыта, думающей
            головы, заботливых рук и специальной техники для Ваших положительных
            эмоций! 👍🏻 Обслуживаем газоны как на постоянной основе, так и
            разово.
          </p>

          <div>
            <p className="text-base mt-[49px]">Продавец</p>
            <div className="flex gap-2 mt-2 mb-[22px]">
              <span className="bg-[#F6F6F6] px-3 py-1 rounded-full flex items-center gap-1 text-sm font-light">
                <img
                  src="/assets/icons/briefcase.svg"
                  className="w-4 h-4"
                  alt="company"
                />
                Company Name
              </span>
              <span className="bg-[#F6F6F6] px-3 py-1 rounded-full flex items-center gap-1 text-sm font-light">
                <img
                  src="/assets/icons/briefcase.svg"
                  className="w-4 h-4"
                  alt="company"
                />
                +7 (999) 999 99 99
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <button className="flex-1 bg-[#3D3BFF] text-white py-3 rounded-[80px]">
              Оставить заявку
            </button>
            <button className="flex-1 bg-transparent border border-black py-3 rounded-[80px]">
              Отправить сообщение
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6">Похожие объявления:</h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <>
            <GridPostList posts={relatedPosts} maxElements={4} />
            <div className="flex justify-center mt-4">
              <button className="bg-[#909090] text-[#FFFFFF]">
                Показать еще
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
