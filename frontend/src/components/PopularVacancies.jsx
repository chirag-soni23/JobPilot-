import React from 'react';

const vacancies = [
  { title: "Anesthesiologists", positions: "45,904" },
  { title: "Surgeons", positions: "50,364" },
  { title: "Obstetricians-Gynecologists", positions: "4,339" },
  { title: "Orthodontists", positions: "20,079" },
  { title: "Maxillofacial Surgeons", positions: "74,975" },
  { title: "Software Developer", positions: "43,359" },
  { title: "Psychiatrists", positions: "18,959" },
  { title: "Data Scientist", positions: "28,200", highlight: true },
  { title: "Financial Manager", positions: "61,591" },
  { title: "Management Analysis", positions: "93,046" },
  { title: "IT Manager", positions: "50,953" },
  { title: "Operations Research Analysis", positions: "16,827" },
];

const PopularVacancies = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-black">
        Most Popular Vacancies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-6">
        {vacancies.map((job, idx) => (
          <div key={idx}>
            <h4 className={`text-[15px] font-medium ${job.highlight ? 'text-blue-500 underline underline-offset-2' : ''}`}>
              {job.title}
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              {job.positions} Open Positions
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularVacancies;
