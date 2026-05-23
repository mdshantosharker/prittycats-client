import BannerPage from "@/components/Homepage/Banner";
import ExtraTwo from "@/components/Homepage/ExtraTwo";
import FeaturedPets from "@/components/Homepage/FeaturedPets";
import PetCareTips from "@/components/Homepage/PetCare";
import SuccessStories from "@/components/Homepage/Success";
import { Surface } from "@/components/Homepage/Surface";
import WhyAdopt from "@/components/Homepage/WhyAdopt";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-6">
        <BannerPage />
        <FeaturedPets />
      </div>
      <div>
        <WhyAdopt />
        <PetCareTips />
        <Surface/>
        <ExtraTwo/>
      </div>
      <SuccessStories />
    </div>
  );
}
