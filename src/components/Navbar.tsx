'use client'
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className=" sticky mt-8 sm:mb-20 sm:max-w-xl md:max-w-xl container lg:max-w-screen-lg  xl:max-w-screen-lg justify-self-center items-center mx-auto rounded-full sm:relative z-20">
      <div className="flex justify-center sm:justify-between">
        <div>
          <Link href="/">
            <span className="text-4xl sm:2xl font-semibold normal-case cursor-pointer" >Caption.OG</span>
            </Link>
        </div>
        <div className="bg-purple-600 hidden sm:block sm:py-2 sm:px-8 rounded-full">Login</div>
      </div>
    </nav>
  );
}

export default Navbar;
