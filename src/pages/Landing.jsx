import Hero from "../components/global/Hero.jsx";
import Header from "../components/global/Header.jsx";

// 03-dashboard-page.png project-source/images
import images from "../assets/images.js";

const Landing = () => {
  return (
    <div className="bg-white font-sans text-gray-800">
      <Header />
      <main>
        <Hero />

        <ProductShowCase img={String(images.landing)} />
      </main>
    </div>
  )
};

const ProductShowCase = ({ img }) => {
  return (
    <section className="bg-linear-to-b from-gray-50 to-white pb-20 md:pb-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Image Wrapper */}
        <div className="relative">
          <img
            src={img}
            alt="Money Manager Dashboard Preview"
            className="w-full h-auto object-cover rounded-2xl shadow-xl border border-gray-200"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1200x600/E2E8F0/4A5568?text=Preview+Unavailable";
            }}
          />
        </div>

        {/* Caption */}
        <p className="mt-6 text-center text-sm text-gray-500">
          A simple and powerful dashboard to manage your finances with clarity
        </p>
      </div>
    </section>
  )
}

export default Landing;