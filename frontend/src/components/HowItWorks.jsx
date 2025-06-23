import upload from '../assets/upload.png';
import user from '../assets/user.png';
import search from '../assets/search.png';
import plus from '../assets/tick.png';
import arrow1 from "../assets/arrow1.png";
import arrow2 from "../assets/arrow2.png";
import arrow3 from "../assets/arrow3.png";

const steps = [
  {
    icon: user,
    title: "Create account",
    desc: "Aliquam facilisis egestas sapien, nec tempor leo tristique at.",
  },
  {
    icon: upload,
    title: "Upload CV/Resume",
    desc: "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales.",
  },
  {
    icon: search,
    title: "Find suitable job",
    desc: "Phasellus quis eleifend ex. Morbi nec fringilla nibh.",
  },
  {
    icon: plus,
    title: "Apply job",
    desc: "Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales purus.",
  },
];

const vectors = [arrow1, arrow2, arrow3];

const HowItWorks = () => {
  return (
    <section className="bg-[#F1F2F4] px-6 md:px-16 lg:px-24 xl:px-32 py-16 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-14">How jobpilot work</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative">
        {steps.map((step, index) => (
          <div key={index} className={`flex flex-col items-center text-center px-3 py-3 relative ${step.title == "Upload CV/Resume" ? "bg-white rounded-2xl" : ""}`}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4">
              <img src={step.icon} alt={step.title} className="w-12 h-12 object-contain" />
            </div>
            <h4 className="text-base font-medium text-gray-800">{step.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{step.desc}</p>

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
