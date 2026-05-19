import BannerPage from "@/components/Homepage/Banner";
import FeaturedPets from "@/components/Homepage/FeaturedPets";
import PetCareTips from "@/components/Homepage/PetCare";
import SuccessStories from "@/components/Homepage/Success";
import WhyAdopt from "@/components/Homepage/WhyAdopt";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-6">
        <BannerPage />
        <FeaturedPets />
      </div>
      <div className="bg-linear-to-b from-white to-gray-100 ">
        <WhyAdopt />
        <PetCareTips />
      </div>
      <SuccessStories />
    </div>
  );
}
