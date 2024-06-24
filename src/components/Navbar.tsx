'use client'
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className=" mt-8 container max-w-screen-xl justify-self-center items-center mx-auto rounded-full relative z-20">
      <div className="flex justify-between">
        <div>
          <Link href="/">
            <span className="text-2xl font-semibold normal-case cursor-pointer " >Caption.OG</span>
            </Link>
        </div>
        <div className="bg-purple-600 py-2 px-8 rounded-full">Login</div>
      </div>
    </nav>
  );
}

export default Navbar;
