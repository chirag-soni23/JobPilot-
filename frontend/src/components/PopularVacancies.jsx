import React from 'react';

const vacancies = [
  { title: "Software Developer", positions: "43,359", highlight: true },
  { title: "Frontend Developer", positions: "25,872" },
  { title: "Backend Developer", positions: "21,109" },
  { title: "Full Stack Developer", positions: "18,764" },
  { title: "DevOps Engineer", positions: "15,230" },
  { title: "Data Scientist", positions: "28,200", highlight: true },
  { title: "Machine Learning Engineer", positions: "14,058" },
  { title: "Cybersecurity Analyst", positions: "19,482" },
  { title: "Cloud Architect", positions: "10,936" },
  { title: "Database Administrator", positions: "11,247" },
  { title: "IT Manager", positions: "50,953" },
  { title: "System Administrator", positions: "17,842" },
];

const PopularVacancies = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-20 transition-colors duration-300">
      <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-black dark:text-white">
        Most Popular IT Vacancies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6">
        {vacancies.map((job, idx) => (
          <div key={idx}>
            <h4
              className={`text-[15px] font-medium transition ${
                job.highlight
                  ? "text-blue-500 underline underline-offset-2"
                  : "text-gray-800 dark:text-gray-100"
              }`}
            >
              {job.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {job.positions} Open Positions
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularVacancies;
