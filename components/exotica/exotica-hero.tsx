import Image from "next/image";
import Link from "next/link";

export function ExoticaHero() {
  return (
    <section className="relative h-screen bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/abstract-feature.png')"
    }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-wider" style={{ fontFamily: 'serif' }}>
            KANPAI NIGHTS
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            From Shinjuku's matchbox bars and Kyoto's atmospheric alleys to Osaka's riotous revelry, 
            Japan's nightlife is a heady mix of tradition, cocktails, and after-hours adventures.
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded font-medium transition-colors duration-300">
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}
