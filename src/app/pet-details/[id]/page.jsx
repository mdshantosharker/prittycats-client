import AdoptionFrom from "@/components/AdoptionFrom";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;

  const {token} = await auth.api.getToken({
    headers: await headers(),
  });
  console.log(token);
  const res = await fetch(`http://localhost:5000/pets/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const pet = await res.json();

  return (
    <div className="min-h-screen dark:bg-transparent bg-slate-50 pt-36 pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 dark:bg-gray-800 dark:border-none  bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
          <div className="h-96 md:h-112.5 w-full overflow-hidden relative group">
            <Image
              src={pet.imageUrl}
              alt={pet.name}
              fill
              className="object-cover transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
              <h1 className="text-4xl dark:text-white sm:text-5xl font-black text-slate-900 tracking-tight">
                {pet.name}
              </h1>
              <span className="bg-slate-900 text-white font-medium px-5 py-2 rounded-full text-xs uppercase tracking-wider shadow-sm">
                {pet.species}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 dark:bg-gray-700 dark:border-none bg-slate-100/60 rounded-2xl p-6 border border-slate-200">
              <div className="space-y-1">
                <h3 className="text-xs dark:text-white font-bold text-slate-400 uppercase tracking-wider">
                  Breed
                </h3>
                <p className="text-base  font-semibold text-slate-800">
                  {pet.breed}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs  dark:text-white font-bold text-slate-400 uppercase tracking-wider">
                  Age
                </h3>
                <p className="text-base font-semibold text-slate-800">
                  {pet.age} Years
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs  dark:text-white font-bold text-slate-400 uppercase tracking-wider">
                  Gender
                </h3>
                <p className="text-base font-semibold text-slate-800">
                  {pet.gender}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs dark:text-white  font-bold text-slate-400 uppercase tracking-wider">
                  Health Status
                </h3>
                <p className="text-base font-semibold text-slate-800">
                  {pet.healthStatus}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs dark:text-white font-bold text-slate-400 uppercase tracking-wider">
                  Vaccination Status
                </h3>
                <p className="text-base font-semibold text-slate-800">
                  {pet.vaccinationStatus}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs dark:text-white font-bold text-slate-400 uppercase tracking-wider">
                  Location
                </h3>
                <p className="text-base font-semibold text-slate-800">
                  {pet.location}
                </p>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs dark:text-white font-bold text-slate-400 uppercase tracking-wider">
                  Adoption Fee
                </h3>
                <p className="text-3xl font-black text-emerald-600">
                  ${pet.adoptionFee}
                </p>
              </div>

              <div className="space-y-1 wrap-break-word">
                <h3 className="text-xs dark:text-white font-bold text-slate-400 uppercase tracking-wider">
                  Owner Email
                </h3>
                <p className="text-base font-semibold text-slate-800">
                  {pet.ownerEmail}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h3 className="text-xl dark:text-white font-bold text-slate-900 mb-3">
                Description
              </h3>
              <p className="text-slate-600 dark:text-white leading-relaxed font-normal text-base">
                {pet.description}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-36">
          <AdoptionFrom pet={pet} />
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
