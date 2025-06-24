import React, { useState } from 'react';
import { Briefcase, Building2, Users } from 'lucide-react';

const defaultStats = [
  {
    id: 1,
    title: 'Live Job',
    count: '1,75,324',
    icon: <Briefcase className="w-8 h-8" />,
  },
  {
    id: 2,
    title: 'Companies',
    count: '97,354',
    icon: <Building2 className="w-8 h-8" />,
  },
  {
    id: 3,
    title: 'Candidates',
    count: '38,47,154',
    icon: <Users className="w-8 h-8" />,
  },
  {
    id: 4,
    title: 'New Jobs',
    count: '7,532',
    icon: <Briefcase className="w-8 h-8" />,
  },
];

const StatsGrid = () => {
  const [activeId, setActiveId] = useState(2);

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 mt-14 transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {defaultStats.map((stat) => {
          const isActive = stat.id === activeId;

          return (
            <div
              key={stat.id}
              onClick={() => setActiveId(stat.id)}
              className={`cursor-pointer flex items-start gap-4 px-5 py-6 rounded-md shadow-md border transition duration-200 ${
                isActive
                  ? 'bg-[#0A65CC]/10 border-[#0A65CC] dark:border-[#0A65CC]'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-md ${
                  isActive
                    ? 'bg-[#0A65CC] text-white'
                    : 'bg-[#0A65CC]/10 text-[#0A65CC] dark:bg-[#0A65CC]/20 dark:text-[#0A65CC]'
                }`}
              >
                {stat.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {stat.count}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsGrid;
