import React, { useState } from "react";

const NewServicePost = () => {
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

  const togglePayment = (method: string) => {
    setPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };

  const Input = (props: any) => (
    <input
      {...props}
      className="bg-[#F0F0F0] border border-[#D9D9D9] rounded-[28px] px-4 py-3 text-sm w-full text-[#000000] placeholder-[#A0A0A0]"
    />
  );

  const Select = ({ options }: { options: string[] }) => (
    <select className="bg-[#F0F0F0] border border-[#D9D9D9] rounded-[28px] px-4 py-3 text-sm w-full text-[#000000]">
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );

  const Textarea = ({
    rows = 4,
    placeholder,
  }: {
    rows?: number;
    placeholder: string;
  }) => (
    <textarea
      placeholder={placeholder}
      rows={rows}
      className="bg-[#FFFFFF] border border-[#D9D9D9] rounded-[20px] px-4 py-3 text-sm w-full text-[#000000] placeholder-[#A0A0A0]"
    />
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-[20px] font-semibold">
        Размещение нового объявления
      </h1>

      {/* Блок 1: Основная информация */}
      <div className="bg-[#F8F8F8] rounded-[20px] py-[38px] px-[42px] space-y-6">
        <h2 className="text-[18px] font-semibold">Основная информация</h2>

        <div className="grid md:grid-cols-3 gap-x-[115px] gap-y-[20px] md:gap-y-[70px]">
          {/* Категория объявления */}
          <div>
            <label className="text-sm text-[#A0A0A0] block mb-1">
              Выберите категорию объявления:
            </label>
            <select className="bg-[#F0F0F0] border border-[#D9D9D9] rounded-[28px] px-4 py-3 text-sm w-full text-black appearance-none mt-2 md:mt-[18px]">
              <option>Услуга</option>
            </select>
          </div>

          {/* Категория товара */}
          <div>
            <label className="text-sm text-[#A0A0A0] block mb-1">
              Выберите категорию товара:
            </label>
            <select className="bg-[#F0F0F0] border border-[#D9D9D9] rounded-[28px] px-4 py-3 text-sm w-full text-black appearance-none mt-2 md:mt-[18px]">
              <option>Outdoor trimming</option>
            </select>
          </div>

          <div></div>

          {/* Название товара */}
          <div>
            <label className="text-sm text-[#A0A0A0] block mb-1">
              Название товара:
            </label>
            <input
              type="text"
              placeholder="Стрижка газонов, уход за двором..."
              className="bg-[#F0F0F0] border border-[#D9D9D9] rounded-[28px] px-4 py-3 text-sm w-full text-black placeholder-[#A0A0A0] mt-2 md:mt-[18px]"
            />
          </div>

          {/* Оплата */}
          <div>
            <label className="text-sm text-[#A0A0A0] block mb-1">Оплата:</label>
            <select className="bg-[#F0F0F0] border border-[#D9D9D9] rounded-[28px] px-4 py-3 text-sm w-full text-black appearance-none mt-2 md:mt-[18px]">
              <option>Почасовая</option>
            </select>
          </div>

          {/* Стоимость часа */}
          <div>
            <label className="text-sm text-[#A0A0A0] block mb-1">
              Стоимость часа (₽/час):
            </label>
            <input
              type="text"
              value="1 500 ₽"
              readOnly
              className="bg-white border border-[#D9D9D9] rounded-[28px] px-4 py-3 text-sm w-full text-black mt-2 md:mt-[18px]"
            />
          </div>
        </div>

        {/* Краткое описание товара */}
        <div className="max-w-[571px] w-full relative">
          <label className="text-sm text-[#A0A0A0] block mb-1">
            Краткое описание товара:
          </label>
          <textarea
            placeholder="Уход за Вашим газоном с использованием знаний..."
            rows={3}
            maxLength={200}
            className="bg-white border border-[#D9D9D9] rounded-[20px] px-4 py-3 text-sm w-full max-w-[571px] min-h-32 text-black placeholder-[#A0A0A0] mt-2 md:mt-[18px]"
          />
          <div className="absolute right-5 bottom-3 text-right text-xs text-[#7A7A7A]">
            0/200
          </div>
        </div>
      </div>

      {/* Блок 2: Подробности и условия */}
      <div className="bg-[#F8F8F8] rounded-[20px] p-8">
        <h2 className="text-[18px] font-semibold">
          Подробное описание и условия сотрудничества
        </h2>
        <div className="mt-11 max-w-[914px] relative">
          <p className="text-sm text-[#7A7A7A] mb-[18px]">
            Подробное описание:
          </p>
          <Textarea
            placeholder="• Сделаем Ваш газон красивым надолго!..."
            rows={9}
          />
          <div className="absolute right-5 bottom-3 text-right text-xs text-[#7A7A7A]">
            0/2000
          </div>
        </div>
        <div className="mt-[70px] max-w-[228px]">
          <p className="text-sm text-[#7A7A7A] mb-1">Услуга оказывается:</p>
          <Select options={["На территории заказчика"]} />
        </div>
        <div className="mt-[70px] max-w-[914px] relative">
          <p className="text-sm text-[#7A7A7A] mb-1">
            Расскажите об условиях сотрудничества:
          </p>
          <Textarea
            placeholder="Обслуживаем газоны как на постоянной основе..."
            rows={8}
          />
          <div className="absolute right-5 bottom-3 text-right text-xs text-[#7A7A7A]">
            0/2000
          </div>
        </div>
      </div>

      {/* Блок 3: Оплата */}
      <div className="bg-[#F8F8F8] rounded-[20px] p-8 space-y-6">
        <h2 className="text-[18px] font-semibold">Оплата</h2>
        <div className="flex flex-wrap gap-4">
          {["Наличными при получении", "Безналичным переводом"].map(
            (method) => (
              <label
                key={method}
                onClick={() => togglePayment(method)}
                className={`cursor-pointer px-4 py-2 rounded-[14px] text-sm font-medium ${
                  paymentMethods.includes(method)
                    ? "bg-[#3D3BFF] text-white"
                    : "bg-[#F0F0F0] text-black"
                }`}>
                {method}
              </label>
            )
          )}
        </div>
        <div className="mt-[70px] max-w-[571px] relative">
          <p className="text-sm text-[#7A7A7A] mb-1">
            Расскажите об условиях оплаты:
          </p>
          <Textarea
            placeholder="Стоимость 1 часа работы - 1500 ₽\nВыезд от 3х часов..."
            rows={6}
          />
          <div className="absolute right-5 bottom-3 text-right text-xs text-[#7A7A7A]">
            0/200
          </div>
        </div>
      </div>

      {/* Блок 4: Фото */}
      <div className="bg-[#F8F8F8] rounded-[20px] p-8 space-y-6">
        <h2 className="text-[18px] font-semibold">Фотографии</h2>
        <p className="max-w-[527px]">
          Первая загруженная фотография автоматически будет отображаться как
          основная
        </p>
        <p className="max-w-[527px]">
          Загрузите не более 8 фотографий товара. (Размер 1 фото - не более 200
          КБ, разрешение - 800x518, файлы JPEG, JPG, PNG)
        </p>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-[18px] bg-[#EDEDED] flex items-center justify-center cursor-pointer">
              <div className="w-[52px] h-[52px] bg-white rounded-full flex items-center justify-center">
                <img src="/public/assets/icons/plus.svg" alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center pt-6">
          <button className="bg-[#3D3BFF] text-white px-8 py-3 rounded-full text-sm font-semibold">
            Разместить объявление
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewServicePost;
