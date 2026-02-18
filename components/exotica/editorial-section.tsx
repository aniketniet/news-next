import Link from "next/link";

export function EditorialSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-wide" style={{ fontFamily: 'serif' }}>
            A world reimagined
          </h1>
          <p className="text-2xl md:text-3xl font-light text-gray-700 italic" style={{ fontFamily: 'serif' }}>
            One journey at a time…
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p className="text-xl leading-relaxed">
              In a world where borders blur with every swipe and stories are shared in 
              real-time over social media, travel has become more than a movement — 
              it's a mindset. Welcome to the reimagined edition of our travel and 
              lifestyle magazine, Exotica, where legacy meets exploration and curiosity finds a new compass.
            </p>

            <p>
              Backed by the rich editorial heritage of The Pioneer that has long shaped public discourse, this version of Exotica is our renewed commitment to storytelling that moves, inspires and informs. While our foundation remains rooted in credibility and insight, we now set our sights farther — to the unexpected corners of the world and the deeper narratives behind every destination. We bring you the joy of travel and revel in personal experiences of the travellers who shares their tales.
            </p>

            <p>
              This is not just about ticking off bucket lists or chasing picture-perfect sunsets. It's about discovering how Tokyo's buzzing Shibuya pulses with youth energy; slowing down with a cup of Karak brewed strong and sweet in Ras Al Khaimah; embark on a commemorative drive in South Africa to celebrate 50 years of Polo, the car; or how to use travel to a destination like Goa to heal a tired soul. We are here to bring you the textures of a place — its food, design, art, people — and invite you to see travel as a bridge between cultures, and not just countries.
            </p>

            <p>
              Each issue is a curated blend of global perspectives and local treasures. From immersive features and expert essays to candid photo stories and first-person pieces, Exotica is but a canvas for thoughtful exploration. Whether you are a seasoned traveller or an armchair adventurer, our aim is to ignite a sense of wonder — and a willingness to wander.
            </p>

            <p className="text-xl leading-relaxed italic">
              In an age of hyper-curation and fast content, we invite you to slow down, turn the page and lean into stories that stay with you. Because travel isn't always about where you go. Sometimes, it is about how you see — and what changes in you when you return.
            </p>

            <p className="text-xl leading-relaxed font-medium">
              Welcome to a renewed journey. Let's explore it together.
            </p>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-lg font-medium text-gray-900 mb-1">Navneet Mendiratta</p>
              <p className="text-gray-600">
                <a href="mailto:navneet@dailypioneer.com" className="text-orange-600 hover:text-orange-700">
                  navneet@dailypioneer.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


