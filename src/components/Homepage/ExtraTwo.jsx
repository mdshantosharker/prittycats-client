import React from "react";

const steps = [
  {
    title: "Find Your Perfect Pet",
    desc: "Browse through verified pets with photos, breed info, and personality details.",
    icon: "🔍",
  },
  {
    title: "Submit Adoption Request",
    desc: "Fill out a quick form so we can understand your lifestyle and preferences.",
    icon: "📝",
  },
  {
    title: "Application Review",
    desc: "Our team carefully checks your application to ensure safe and responsible adoption.",
    icon: "✅",
  },
  {
    title: "Meet & Greet",
    desc: "Spend time with your selected pet to see if it's the perfect match.",
    icon: "🤝",
  },
  {
    title: "Bring Your Pet Home",
    desc: "Final approval done! Welcome your new family member home 🏡",
    icon: "🏡",
  },
];

const ExtraTwo = () => {
  return (
    <div className="py-16 my-20 px-4 bg-linear-to-b from-pink-50 via-white to-orange-50">
     
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-gray-800">
          🐾 Adoption Journey
        </h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Adopting a pet is not just a process — it's a beautiful journey of love,
          care, and lifelong companionship.
        </p>
      </div>

      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl bg-pink-100 w-12 h-12 flex items-center justify-center rounded-xl">
                {step.icon}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-600 transition">
                  {step.title}
                </h3>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <div className="bg-white rounded-2xl shadow-md p-8 border">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            💡 Why Adopt From Us?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We ensure every pet is vaccinated, health-checked, and ready for a
            safe home. Our adoption process is simple, transparent, and focused
            on matching the right pet with the right family.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <span className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full">
              ✔ Verified Pets
            </span>
            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full">
              ✔ Quick Approval
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full">
              ✔ Health Checked
            </span>
            <span className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full">
              ✔ Lifetime Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraTwo;