import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const HomeNav = () => {
  console.log('Rendering the HomeNav component');
  return (
    <div className="flex justify-center ">
      <header className="sticky top-0 flex h-16 items-center border-b bg-background px-2 md:px-6 justify-between max-w-[1920px] w-screen">
        <nav className="w-full items-center gap-6 text-lg font-medium flex justify-between md:gap-5 md:text-sm lg:gap-6">
          <div>
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
              <div className="logo font-myFont text-4xl">
                <a href="/">Streamix</a>
              </div>
              <span className="sr-only">Acme Inc</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <Button variant="outline" className="shrink-0">
              <Link to="/signin">Try Now</Link>
            </Button>
          </div>
        </nav>
      </header>
    </div>
  );
};
