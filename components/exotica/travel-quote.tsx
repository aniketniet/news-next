import Image from "next/image";

export function TravelQuote() {
  const quote = {
    text: "Travel makes one modest. You see what a tiny place you occupy in the world.",
    author: "Gustave Flaubert",
    backgroundImage: "/abstract-geometric-shapes.png"
  };

//   const stats = [
//     { number: "150+", label: "Destinations Covered" },
//     { number: "500+", label: "Travel Stories" },
//     { number: "50+", label: "Expert Writers" },
//     { number: "2M+", label: "Monthly Readers" }
//   ];

  return (
    <section className="relative py-20 overflow-hidden  bg-gray-200">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="max-w-4xl mx-auto mb-12">
            <svg className="w-16 h-16 text-orange-400 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
            </svg>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-relaxed mb-8">
              "{quote.text}"
            </blockquote>
            <cite className="text-xl text-orange-300 font-medium">
              — {quote.author}
            </cite>
          </div>

          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
