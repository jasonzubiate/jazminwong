import Image from "next/image";
import { playfair_display } from "@/fonts";

export default function Hero() {
  return (
    <section className="px-4 pt-4 pb-24">
      <h1 className="hidden">Jazmin Wong</h1>

      <div className="w-full pointer-events-none mb-4">
        <Image
          src="/images/other/jazmin-wong-header.png"
          alt="Hero"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="flex justify-between items-center mb-12">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold">
            Content Creation and Digital Storytelling
          </p>
          <p
            className={`${playfair_display.className} text-2xl font-normal -mt-1`}
          >
            Scaling digital brands reach and impact
          </p>
        </div>

        <button className="px-5 py-2 rounded-full bg-stone-100 cursor-pointer">
          <span className="text-xl font-semibold">Socials</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1742519077728-f40bd20f7d52?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="col-span-1 overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1742518189972-c750812c30e2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="col-span-1 overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1741856067761-1c544431e2b5?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
