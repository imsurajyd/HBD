import { useState } from "react";
import { memories } from "../data/memories";
import MemoryCard from "./MemoryCard";

function MemoriesSection() {
  const [selectedMemory, setSelectedMemory] = useState(null);

  return (
    <section className="min-h-screen bg-[#fffafc] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#a76576]">
            Little pieces of us
          </p>

          <h2 className="font-display text-6xl font-semibold text-[#5b343f] sm:text-8xl">
            Our <span className="italic text-[#df6f8d]">Memories</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#8d6972] sm:text-base">
            Some moments are too beautiful to be forgotten.
            <br />
            So here's a little place to keep them forever. ❤️
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory, index) => (
            <MemoryCard
              key={index}
              memory={memory}
              onClick={() => setSelectedMemory(memory)}
            />
          ))}
        </div>
      </div>

      {selectedMemory && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#5b343f]/70 p-5 backdrop-blur-md"
          onClick={() => setSelectedMemory(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl rounded-xl bg-white p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMemory(null)}
              className="absolute -right-3 -top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-lg"
            >
              ×
            </button>

            <img
              src={selectedMemory.image}
              alt={selectedMemory.caption}
              className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain"
            />

            <div className="px-2 pb-2 pt-4 text-center">
              <p className="font-display text-2xl italic text-[#5b343f]">
                {selectedMemory.caption}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-widest text-[#b28a94]">
                {selectedMemory.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MemoriesSection;
