import React from "react";

export const Hero = () => {
  return (
    <div className="relative mx-auto max-w-3xl">
      <h1 className="relative mt-12 text-4xl font-extrabold leading-tight tracking-tight text-slate-800 md:text-5xl lg:text-center lg:text-5xl">
        <span>Crie seu </span>
        <span className="relative inline-flex md:border-b-4 md:border-fuchsia-300/50 md:pb-2">
          <span> convite digital </span>
        </span>
        <span> em </span>
        <span className="mt-1 bg-gradient-to-r from-fuchsia-300 via-purple-300 to-pink-300 bg-clip-text text-transparent xl:mt-0 xl:inline">
          minutos
        </span>
      </h1>

      <p className="mx-auto mt-6 space-y-1 leading-relaxed tracking-wide text-slate-600 md:text-2xl lg:text-center">
        <span className="flex items-center justify-center space-x-1">
          Crie seu convite digital em minutos e compartilhe com seus amigos e
          familiares.
        </span>
      </p>
    </div>
  );
};
