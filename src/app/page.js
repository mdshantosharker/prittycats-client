import BannerPage from "@/components/Homepage/Banner";
import FeaturedPets from "@/components/Homepage/FeaturedPets";

export default function Home() {
  return (
    <div>
      <BannerPage />
      <FeaturedPets />
      <h1 className="border-5 mt-10 border-yellow-300">Extra sections</h1>
    </div>
  );
}
