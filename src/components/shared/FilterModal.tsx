import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import * as Slider from "@radix-ui/react-slider";

const FilterModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [owner, setOwner] = useState<string[]>(["private"]);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);

  const toggleOwner = (value: string) => {
    setOwner((prev) =>
      prev.includes(value) ? prev.filter((o) => o !== value) : [...prev, value]
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-[319px] max-h-[553px] bg-white rounded-[28px] p-6 space-y-6 shadow-lg">
          <Dialog.Title className="text-lg font-light flex items-center gap-2">
            <img
              src="/public/assets/icons/filter.svg"
              alt="filter"
              className="w-6 h-6"
            />
            Фильтры
          </Dialog.Title>

          <hr className="border-gray-200" />

          {/* Локация */}
          <div className="space-y-2">
            <p className="">Локация</p>
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full border border-black rounded-full px-4 py-2 text-sm"
            />
          </div>

          <hr className="border-gray-200" />

          {/* Стоимость */}
          <div className="space-y-2">
            <p className="">Стоимость</p>
            <Slider.Root
              value={priceRange}
              onValueChange={(val) => setPriceRange(val as [number, number])}
              min={0}
              max={500}
              step={1}
              className="relative flex items-center w-full h-6">
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                <Slider.Range className="absolute bg-black rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-4 h-4 bg-black rounded-full shadow" />
              <Slider.Thumb className="block w-4 h-4 bg-black rounded-full shadow" />
            </Slider.Root>

            <div className="flex justify-between text-sm mt-2">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Владелец */}
          <div className="space-y-2">
            <p className="">Владелец</p>
            <div className="flex gap-4 items-center">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={owner.includes("private")}
                  onChange={() => toggleOwner("private")}
                  className="accent-[#3D3BFF] w-4 h-4"
                />
                Частный
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={owner.includes("company")}
                  onChange={() => toggleOwner("company")}
                  className="accent-[#3D3BFF] w-4 h-4"
                />
                Компания
              </label>
            </div>
          </div>

          {/* Кнопки */}
          <div className="pt-2 space-y-3">
            <button className="w-full bg-[#3D3BFF] text-white text-sm font-medium py-3 rounded-full">
              Применить
            </button>
            <button className="w-full border border-black text-sm font-medium py-3 rounded-full">
              Сбросить все фильтры
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FilterModal;
