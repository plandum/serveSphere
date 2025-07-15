import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";
import TopbarSearch2 from "@/components/ui/TopBarSearch2";

const TopSideBar2 = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <header className="w-full py-5 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/assets/icons/logo.svg"
            alt="logo"
            width={211}
            height={58}
          />
        </Link>

        <div className="flex">
          {/* Search */}
          <TopbarSearch2 />

          {/* Профиль или загрузка */}
          <div className="flex items-center gap-4 ml-[52px]">
            {isLoading || !user.email ? (
              <Loader />
            ) : (
              <div className="flex items-center gap-[33px]">
                <Link
                  to={`/chats`}
                  className="flex items-center h-[24px] w-[24px]">
                  <img
                    src={"/assets/icons/chat-icon.svg"}
                    alt="profile"
                    className="rounded-full object-cover"
                  />
                </Link>
                <Link
                  to={`/profile/${user.id}`}
                  className="flex items-center mr-[6px] h-[24px] w-[24px]">
                  <img
                    src={"/assets/icons/notification-icon.svg"}
                    alt="profile"
                    className="rounded-full object-cover"
                  />
                </Link>
                <Link
                  to={`/profile/${user.id}`}
                  className="flex items-center h-[38px] w-[38px]">
                  <img
                    src={
                      user.imageUrl || "/assets/icons/profile-placeholder.svg"
                    }
                    alt="profile"
                    className="rounded-full object-cover"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopSideBar2;
