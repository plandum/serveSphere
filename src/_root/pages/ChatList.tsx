import React, { useState } from "react";
import TopbarSearch2 from "@/components/ui/TopBarSearch2";

const ChatList = () => {
  const [selectedTab, setSelectedTab] = useState("all");

  const chats = Array.from({ length: 7 }).map((_, i) => ({
    id: i,
    name: "Надежда Игнатьева",
    car: "Skoda Rapid, 1.6 AT, 2021",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
    time: "23.05.2025 в 15:00",
    avatar: "/public/assets/icons/avatarForChat.png",
  }));

  return (
    <div className="pb-10">
      <div className="flex flex-col gap-4 md:flex-row md:gap-11">
        <h2 className="text-[24px] text-black">Чаты</h2>
        <TopbarSearch2 />
      </div>

      <div className="flex flex-col gap-6 mt-9 lg:flex-row lg:gap-8">
        <aside className="w-full lg:w-[235px]">
          <div className="flex flex-row lg:flex-col gap-2 border border-[#E5E5E5] px-3 py-4 rounded-[20px]">
            {["all", "inbox", "outbox"].map((tabKey) => (
              <button
                key={tabKey}
                className={`py-[6px] px-5 text-left rounded-[100px] whitespace-nowrap ${
                  selectedTab === tabKey
                    ? "bg-[#3D3BFF] text-white"
                    : "text-black hover:bg-[#F5F5F5] font-light"
                }`}
                onClick={() => setSelectedTab(tabKey)}>
                {
                  {
                    all: "Все",
                    inbox: "Входящие",
                    outbox: "Исходящие",
                  }[tabKey]
                }
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 lg:pl-6 flex flex-col gap-4">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className="bg-[#F8F8F8] rounded-[10px] p-[22px] flex flex-col sm:flex-row items-start gap-4">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-10 h-10 rounded-full mb-2 sm:mb-0"
              />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <p className="text-[14px] font-semibold text-black">
                    {chat.name}
                  </p>
                  <span className="text-xs text-[#848484]">{chat.time}</span>
                </div>
                <p className="text-sm font-medium mt-[10px]">{chat.car}</p>
                <p className="text-sm font-light mt-2 leading-[18px]">
                  {chat.message}
                </p>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default ChatList;
