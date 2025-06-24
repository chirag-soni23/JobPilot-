import { assets } from '../assets/assets';

const steps = [
  {
    icon: assets.user,
    title: "Create account",
    desc: "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
  },
  {
    icon: assets.upload,
    title: "Upload CV/Resume",
    desc: "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales.",
  },
  {
    icon: assets.search,
    title: "Find suitable job",
    desc: "Phasellus quis eleifend ex. Morbi nec fringilla nibh.",
  },
  {
    icon: assets.tick,
    title: "Apply job",
    desc: "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales purus.",
  },
];

const vectors = [assets.arrow1, assets.arrow2, assets.arrow3];

const HowItWorks = () => {
  return (
    <section className="bg-[#F1F2F4] dark:bg-gray-950 px-6 md:px-16 lg:px-24 xl:px-32 py-16 text-center transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl font-semibold mb-14 text-gray-900 dark:text-white">
        How jobpilot work
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center px-3 py-3 relative transition-colors duration-300 ${
              step.title === "Upload CV/Resume"
                ? "bg-white dark:bg-gray-900 rounded-2xl"
                : ""
            }`}
          >
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <img
                src={step.icon}
                alt={step.title}
                className="w-12 h-12 object-contain"
              />
            </div>
            <h4 className="text-base font-medium text-gray-800 dark:text-white">
              {step.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {step.desc}
            </p>

            {index < steps.length - 1 && (
              <img
                src={vectors[index]}
                alt={`arrow-${index}`}
                className="hidden z-10 md:block absolute top-[30px] right-[-60px] h-auto w-40"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
