export default function CallToAction() {
  return (
    <section className="p-14 text-center rounded-3xl border border-solid bg-blue-400 bg-opacity-10 border-blue-400 border-opacity-20">
      <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
        Need Professional Assistance?
      </h2>
      <p className="mx-auto mt-0 mb-10 text-lg leading-relaxed max-w-[700px] text-zinc-300">
        LACERA pension division is complex and requires specialized expertise.
        Our team provides comprehensive support for LACERA DRO preparation and
        processing for Los Angeles County employees.
      </p>
      <div className="flex gap-5 justify-center max-sm:flex-col max-sm:items-center">
        <button className="px-8 py-4 text-lg font-semibold text-white bg-blue-400 rounded-lg transition-all cursor-pointer border-[none] duration-[0.2s]">
          Get Expert Help
        </button>
        <button className="px-8 py-4 text-lg font-semibold bg-transparent rounded-lg border-2 border-solid transition-all cursor-pointer border-zinc-300 border-opacity-30 duration-[0.2s] text-zinc-300">
          Download Resources
        </button>
      </div>
    </section>
  );
}
