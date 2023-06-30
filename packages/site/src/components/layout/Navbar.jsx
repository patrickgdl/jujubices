import Link from "next/link";

import s from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={s.root}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="align-center relative flex flex-row justify-between py-4 md:py-4">
          <div className="flex flex-1 items-center">
            <Link href="/" className={s.logo} aria-label="Logo">
              {/* <LogoGradient className="h-8" /> */}
            </Link>

            <nav className="ml-8 hidden space-x-4 lg:block">
              <Link href="/pricing" className={s.link}>
                Preços
              </Link>
              <Link href="/account" className={s.link}>
                Conta
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            <Link href="/signin" className={s.link}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
