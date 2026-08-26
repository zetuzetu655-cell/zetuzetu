export function ManifestoBanner() {
  return (
    <section className="relative py-16 md:py-24 bg-black overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-lime/5 blur-[100px]" />

      <div className="section-pad relative text-center">
        <h2 className="font-display font-bold text-lime text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-shadow-glow leading-tight">
          Yetu Sote,
          <br />
          <span className="text-lime-glow">Form Ni Zetu</span>
        </h2>
        <p className="mt-6 text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Our lives, our future, our responsibility. An initiative for peace,
          choosing purpose over crime.
        </p>
      </div>
    </section>
  );
}
