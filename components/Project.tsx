import React from 'react';

const PersonalBankerPortfolio = () => {
  const metadata = [
    { label: 'TECH STACK', value: 'Next.js 15, Prisma, NeonDB, Vercel AI SDK' },
    { label: 'INDUSTRY', value: 'Fintech & AI Automation' },
    { label: 'ROLE', value: 'Full Stack Developer' },
  ];

  const features = [
    {
      title: 'AI Chatbot Agent',
      desc: 'Context-aware assistant using Tavily MCP to query internal portfolio data and live market trends.',
    },
    {
      title: 'Automated Notifications',
      desc: 'Real-time alerts via n8n for bond maturities and BNM base rate shifts via Telegram and Resend.',
    },
    {
      title: 'Wealth Growth Simulator',
      desc: 'Complex data visualization comparing portfolio ROI against inflation and national bank benchmarks.',
    },
    {
      title: 'Investment Calendar',
      desc: 'Dynamic scheduling and tracking of fixed-income assets and bank deposit maturity dates.',
    },
  ];

  return (
    <div className='min-h-screen bg-white text-black font-sans selection:bg-blue-50'>
      <main className='max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16'>
          {/* Left Column: Context & Features */}
          <div className='lg:col-span-4 flex flex-col'>
            <div className='mb-12'>
              <span className='text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block'>
                Full Stack Development
              </span>
              <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-6'>
                Personal Banker
              </h1>
              <p className='text-gray-600 text-lg leading-relaxed max-w-2xl'>
                A sophisticated fintech ecosystem for tracking high-yield
                investments through agentic AI and proactive automation.
              </p>
            </div>

            <div className='h-px bg-gray-100 w-full mb-10' />

            {/* Metadata Section */}
            <div className='space-y-8 mb-12'>
              {metadata.map((item) => (
                <div key={item.label}>
                  <span className='text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block'>
                    {item.label}
                  </span>
                  <span className='text-base md:text-lg font-medium'>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className='h-px bg-gray-100 w-full mb-10' />

            {/* Features Sidebar */}
            <div>
              <span className='text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 block'>
                KEY FEATURES
              </span>
              <div className='space-y-8'>
                {features.map((feature) => (
                  <div key={feature.title} className='group'>
                    <h3 className='text-sm md:text-base font-bold mb-1 group-hover:text-blue-600 transition-colors'>
                      {feature.title}
                    </h3>
                    <p className='text-xs md:text-sm text-gray-500 leading-relaxed'>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Visuals & Narrative */}
          <div className='lg:col-span-8'>
            <div className='rounded-2xl overflow-hidden bg-gray-50 mb-12 border border-gray-100 shadow-sm'>
              {/* Placeholder for your actual app screenshot */}
              <div className='aspect-[16/10] bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center relative overflow-hidden'>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                <div className='relative text-center'>
                  <div className='text-white text-6xl font-light tracking-tighter opacity-80'>
                    Personal<span className='font-bold'>Banker</span>
                  </div>
                  <div className='mt-4 flex justify-center gap-2'>
                    <div className='h-1 w-12 bg-blue-500 rounded-full' />
                    <div className='h-1 w-4 bg-gray-600 rounded-full' />
                  </div>
                </div>
              </div>
            </div>

            <div className='max-w-2xl'>
              <p className='text-xl md:text-2xl text-gray-700 leading-relaxed mb-12'>
                This application transforms fragmented financial data into an
                actionable dashboard. By leveraging the Vercel AI SDK, it allows
                users to perform complex natural language queries against their
                own Prisma-managed database.
              </p>

              <h2 className='text-2xl md:text-3xl font-bold mb-6'>
                The Challenge
              </h2>
              <p className='text-gray-600 leading-relaxed mb-6'>
                Managing diverse government bonds and bank deposits across
                different currencies requires constant monitoring of maturity
                dates and fluctuating interest rates. Personal Banker automates
                this oversight, ensuring no reinvestment opportunity is missed.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalBankerPortfolio;
