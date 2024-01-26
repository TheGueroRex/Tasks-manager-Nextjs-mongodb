"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

function Navbar({ sigOut }) {
  const currentRoute = usePathname();

  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  if (sigOut) {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <div className={`w-[550px] max-sm:w-[90%] h-[100%] relative z-0`}>
      <nav
        className={`${
          currentRoute == "/login" || currentRoute == "/register"
            ? "hidden"
            : "visible"
        } absolute w-[100%] h-12 flex bottom-10 justify-between items-center`}
      >
        <div className="flex gap-4">
          {session ? (
            <button
              onClick={handleLogout}
              className="w-[40px] h-[40px] grid place-items-center bg-sky-600 rounded-[50%]"
            >
              <svg
                className="group-hover:scale-110 transition"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_403_3065)">
                  <path
                    d="M11.476 15C11.2108 15 10.9564 15.1054 10.7689 15.2929C10.5814 15.4804 10.476 15.7348 10.476 16V19C10.476 19.7956 10.1599 20.5587 9.59732 21.1213C9.03471 21.6839 8.27165 22 7.476 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H7.476C8.27165 2 9.03471 2.31607 9.59732 2.87868C10.1599 3.44129 10.476 4.20435 10.476 5V8C10.476 8.26522 10.5814 8.51957 10.7689 8.70711C10.9564 8.89464 11.2108 9 11.476 9C11.7412 9 11.9956 8.89464 12.1831 8.70711C12.3706 8.51957 12.476 8.26522 12.476 8V5C12.4744 3.67441 11.9471 2.40356 11.0098 1.46622C10.0724 0.528882 8.80159 0.00158786 7.476 0H5C3.67441 0.00158786 2.40356 0.528882 1.46622 1.46622C0.528882 2.40356 0.00158786 3.67441 0 5L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H7.476C8.80159 23.9984 10.0724 23.4711 11.0098 22.5338C11.9471 21.5964 12.4744 20.3256 12.476 19V16C12.476 15.7348 12.3706 15.4804 12.1831 15.2929C11.9956 15.1054 11.7412 15 11.476 15Z"
                    fill="#ffffff"
                  />
                  <path
                    d="M22.8672 9.8792L18.2812 5.2932C18.1889 5.19769 18.0786 5.12151 17.9566 5.0691C17.8346 5.01669 17.7033 4.98911 17.5706 4.98795C17.4378 4.9868 17.3061 5.0121 17.1832 5.06238C17.0603 5.11266 16.9487 5.18692 16.8548 5.28081C16.7609 5.3747 16.6866 5.48635 16.6363 5.60925C16.5861 5.73215 16.5608 5.86383 16.5619 5.9966C16.5631 6.12938 16.5906 6.2606 16.6431 6.38261C16.6955 6.50461 16.7716 6.61496 16.8672 6.7072L21.1292 10.9702L6.00015 11.0002C5.73494 11.0002 5.48058 11.1056 5.29305 11.2931C5.10551 11.4806 5.00015 11.735 5.00015 12.0002C5.00015 12.2654 5.10551 12.5198 5.29305 12.7073C5.48058 12.8948 5.73494 13.0002 6.00015 13.0002L21.1882 12.9692L16.8652 17.2932C16.7696 17.3855 16.6935 17.4958 16.6411 17.6178C16.5886 17.7398 16.5611 17.871 16.5599 18.0038C16.5588 18.1366 16.5841 18.2683 16.6343 18.3912C16.6846 18.5141 16.7589 18.6257 16.8528 18.7196C16.9467 18.8135 17.0583 18.8877 17.1812 18.938C17.3041 18.9883 17.4358 19.0136 17.5686 19.0125C17.7013 19.0113 17.8326 18.9837 17.9546 18.9313C18.0766 18.8789 18.1869 18.8027 18.2792 18.7072L22.8652 14.1212C23.4278 13.5589 23.7441 12.7961 23.7445 12.0006C23.7449 11.2051 23.4293 10.4421 22.8672 9.8792Z"
                    fill="#ffffff"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_403_3065">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          ) : (
            ""
          )}

          <Link
            href={"/dashboard"}
            className={`group w-[40px] h-[40px] grid place-items-center bg-sky-600 rounded-[50%]`}
          >
            <svg
              className="group-hover:scale-110 transition"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_403_2799)">
                <path
                  d="M12 11.9999C13.1867 11.9999 14.3467 11.648 15.3334 10.9888C16.3201 10.3295 17.0892 9.3924 17.5433 8.29604C17.9974 7.19969 18.1162 5.99329 17.8847 4.8294C17.6532 3.66551 17.0818 2.59642 16.2426 1.7573C15.4035 0.918186 14.3344 0.346741 13.1705 0.11523C12.0067 -0.116281 10.8003 0.00253868 9.7039 0.456664C8.60754 0.91079 7.67047 1.67983 7.01118 2.66652C6.35189 3.65321 6 4.81325 6 5.99994C6.00159 7.59075 6.63424 9.11595 7.75911 10.2408C8.88399 11.3657 10.4092 11.9984 12 11.9999ZM12 1.99994C12.7911 1.99994 13.5645 2.23454 14.2223 2.67406C14.8801 3.11359 15.3928 3.7383 15.6955 4.46921C15.9983 5.20011 16.0775 6.00438 15.9231 6.7803C15.7688 7.55623 15.3878 8.26896 14.8284 8.82837C14.269 9.38778 13.5563 9.76874 12.7804 9.92308C12.0044 10.0774 11.2002 9.99821 10.4693 9.69546C9.73836 9.39271 9.11365 8.88002 8.67412 8.22222C8.2346 7.56443 8 6.79107 8 5.99994C8 4.93908 8.42143 3.92166 9.17157 3.17151C9.92172 2.42137 10.9391 1.99994 12 1.99994Z"
                  fill="#ffffff"
                />
                <path
                  d="M12 14.0006C9.61386 14.0033 7.32622 14.9523 5.63896 16.6396C3.95171 18.3268 3.00265 20.6145 3 23.0006C3 23.2658 3.10536 23.5202 3.29289 23.7077C3.48043 23.8953 3.73478 24.0006 4 24.0006C4.26522 24.0006 4.51957 23.8953 4.70711 23.7077C4.89464 23.5202 5 23.2658 5 23.0006C5 21.1441 5.7375 19.3636 7.05025 18.0509C8.36301 16.7381 10.1435 16.0006 12 16.0006C13.8565 16.0006 15.637 16.7381 16.9497 18.0509C18.2625 19.3636 19 21.1441 19 23.0006C19 23.2658 19.1054 23.5202 19.2929 23.7077C19.4804 23.8953 19.7348 24.0006 20 24.0006C20.2652 24.0006 20.5196 23.8953 20.7071 23.7077C20.8946 23.5202 21 23.2658 21 23.0006C20.9974 20.6145 20.0483 18.3268 18.361 16.6396C16.6738 14.9523 14.3861 14.0033 12 14.0006Z"
                  fill="#ffffff"
                />
              </g>
              <defs>
                <clipPath id="clip0_403_2799">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
        <div className="flex gap-4">
          <ThemeToggle />
          <Link
            href={"/tasks/new"}
            className={`${
              currentRoute == "/" ? "visible" : "hidden"
            } group w-[40px] h-[40px] grid place-items-center bg-sky-600 rounded-[50%]`}
          >
            <svg
              className="group-hover:scale-110 transition"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_403_3168)">
                <path
                  d="M23 11H13V1C13 0.734784 12.8946 0.48043 12.7071 0.292893C12.5196 0.105357 12.2652 0 12 0V0C11.7348 0 11.4804 0.105357 11.2929 0.292893C11.1054 0.48043 11 0.734784 11 1V11H1C0.734784 11 0.48043 11.1054 0.292893 11.2929C0.105357 11.4804 0 11.7348 0 12H0C0 12.2652 0.105357 12.5196 0.292893 12.7071C0.48043 12.8946 0.734784 13 1 13H11V23C11 23.2652 11.1054 23.5196 11.2929 23.7071C11.4804 23.8946 11.7348 24 12 24C12.2652 24 12.5196 23.8946 12.7071 23.7071C12.8946 23.5196 13 23.2652 13 23V13H23C23.2652 13 23.5196 12.8946 23.7071 12.7071C23.8946 12.5196 24 12.2652 24 12C24 11.7348 23.8946 11.4804 23.7071 11.2929C23.5196 11.1054 23.2652 11 23 11Z"
                  fill="#ffffff"
                />
              </g>
              <defs>
                <clipPath id="clip0_403_3168">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link
            href={"/"}
            className={`${
              currentRoute == "/" ||
              currentRoute == "/login" ||
              currentRoute == "/register"
                ? "hidden"
                : "visible"
            } w-[40px] h-[40px] grid place-items-center bg-sky-600 rounded-[50%]`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 10.9999H9L12.29 7.70994C12.3837 7.61697 12.4581 7.50637 12.5089 7.38451C12.5597 7.26265 12.5858 7.13195 12.5858 6.99994C12.5858 6.86793 12.5597 6.73722 12.5089 6.61536C12.4581 6.4935 12.3837 6.3829 12.29 6.28994C12.1026 6.10369 11.8492 5.99915 11.585 5.99915C11.3208 5.99915 11.0674 6.10369 10.88 6.28994L6.59 10.5899C6.21441 10.9633 6.00223 11.4704 6 11.9999C6.00487 12.526 6.21684 13.029 6.59 13.3999L10.88 17.6999C10.9732 17.7925 11.0838 17.8658 11.2054 17.9157C11.3269 17.9655 11.4571 17.9909 11.5885 17.9905C11.7199 17.99 11.8499 17.9637 11.9712 17.913C12.0924 17.8623 12.2024 17.7882 12.295 17.6949C12.3876 17.6017 12.4609 17.4911 12.5107 17.3696C12.5606 17.248 12.586 17.1178 12.5856 16.9864C12.5851 16.855 12.5588 16.725 12.508 16.6038C12.4573 16.4825 12.3832 16.3725 12.29 16.2799L9 12.9999H19C19.2652 12.9999 19.5196 12.8946 19.7071 12.707C19.8946 12.5195 20 12.2651 20 11.9999C20 11.7347 19.8946 11.4804 19.7071 11.2928C19.5196 11.1053 19.2652 10.9999 19 10.9999Z"
                fill="#ffffff"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
