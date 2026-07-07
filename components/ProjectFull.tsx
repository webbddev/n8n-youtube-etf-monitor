import React from 'react';
import Image from 'next/image';

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
          {/* Left Column: Fixed Sidebar */}
          <div className='lg:col-span-4 flex flex-col'>
            <div className='mb-12'>
              <span className='text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block'>
                Full Stack Development
              </span>
              <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight'>
                Personal <br className='hidden lg:block' /> Banker
              </h1>
              <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
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
                  <span className='text-sm md:text-base font-medium'>
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
              <div className='space-y-10'>
                {features.map((feature) => (
                  <div key={feature.title} className='group'>
                    <h3 className='text-sm md:text-base font-bold mb-2 group-hover:text-blue-600 transition-colors'>
                      {feature.title}
                    </h3>
                    <p className='text-xs md:text-sm text-gray-400 leading-relaxed'>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: All content here spans the width of the main image */}
          <div className='lg:col-span-8'>
            {/* Main Hero Image */}
            <div className='relative rounded-2xl overflow-hidden bg-gray-50 mb-12 border border-gray-100 shadow-sm aspect-[16/10] w-full'>
              <Image
                src='https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2232'
                alt='System Architecture & ROI Visualization'
                fill
                priority
                className='object-cover transition-transform duration-700 hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8'>
                <p className='text-white font-medium tracking-widest uppercase text-[10px]'>
                  System Architecture & ROI Visualization
                </p>
              </div>
            </div>

            {/* Content Body - Spans Full Column Width */}
            <div className='w-full'>
              <p className='text-xl md:text-2xl text-gray-700 leading-relaxed mb-16'>
                Personal Banker was conceived to bridge the gap between static
                financial spreadsheets and active portfolio management. The
                challenge was to build a secure, agentic ecosystem that
                transforms fragmented investment data into proactive financial
                intelligence.
              </p>

              {/* The Challenge Section */}
              <section className='mb-20'>
                <h2 className='text-2xl md:text-3xl font-bold mb-8'>
                  The Challenge
                </h2>
                <p className='text-gray-600 leading-relaxed mb-10 text-lg'>
                  The retail investment landscape is often cluttered with
                  platforms offering too much data and not enough insight. For
                  an investor managing diverse assets across multiple banks and
                  currencies, the primary hurdle is the cognitive load of manual
                  tracking.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-gray-100 pt-10'>
                  <div>
                    <h4 className='font-bold text-xs uppercase tracking-wider mb-3 text-black'>
                      Data Fragmentation
                    </h4>
                    <p className='text-sm text-gray-500 leading-relaxed'>
                      Maintaining a clear view of net worth across MDL, EUR, and
                      USD assets was an error-prone manual task.
                    </p>
                  </div>
                  <div>
                    <h4 className='font-bold text-xs uppercase tracking-wider mb-3 text-black'>
                      Proactive Oversight
                    </h4>
                    <p className='text-sm text-gray-500 leading-relaxed'>
                      The system needed to shift from a &quot;pull&quot; model
                      to a &quot;push&quot; model, alerting users to BNM rate
                      shifts and bond maturities.
                    </p>
                  </div>
                </div>
              </section>

              {/* Process Section */}
              <section className='mb-20'>
                <div className='relative rounded-xl overflow-hidden bg-gray-50 mb-12 border border-gray-100 aspect-[16/10] w-full'>
                  <Image
                    src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=4810&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    alt='Data Analytics Interface'
                    fill
                    className='object-cover grayscale hover:grayscale-0 transition-all duration-700'
                  />
                </div>
                <h2 className='text-2xl md:text-3xl font-bold mb-8'>Process</h2>
                <p className='text-gray-600 leading-relaxed mb-8 text-lg'>
                  I prioritized a Local-First engineering mindset, focusing on
                  data privacy and architectural scalability. The strategy
                  combined a robust Next.js frontend with high-performance
                  NeonDB, orchestrated by n8n.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
                  <ul className='space-y-4'>
                    {[
                      'Prisma ORM for complex relational mapping',
                      'Vercel AI SDK & Tavily MCP for agentic reasoning',
                    ].map((step) => (
                      <li
                        key={step}
                        className='flex items-start gap-3 text-gray-600 text-sm'
                      >
                        <span className='h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0' />
                        {step}
                      </li>
                    ))}
                  </ul>
                  <ul className='space-y-4'>
                    {[
                      'n8n pipelines for financial data scraping',
                      'Custom ROI visualization components',
                    ].map((step) => (
                      <li
                        key={step}
                        className='flex items-start gap-3 text-gray-600 text-sm'
                      >
                        <span className='h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0' />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Outcome Section */}
              <section className='mb-12'>
                <div className='relative rounded-xl overflow-hidden mb-12 aspect-[21/9] w-full border border-gray-100 shadow-sm'>
                  <Image
                    src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426'
                    alt='Growth and Financial Clarity'
                    fill
                    className='object-cover'
                  />
                </div>
                <h2 className='text-2xl md:text-3xl font-bold mb-8'>Outcome</h2>
                <div className='space-y-6'>
                  <p className='text-gray-600 leading-relaxed text-lg'>
                    The resulting ecosystem successfully transitioned personal
                    finance from a chore into a streamlined experience. By
                    centralizing high-yield assets and automating monitoring,
                    the platform provides a competitive edge in wealth
                    preservation.
                  </p>
                  <p className='text-gray-600 leading-relaxed text-lg'>
                    The final system emphasizes a &quot;clean-tech&quot;
                    aesthetic, where complex financial data is stripped to its
                    most readable form, allowing AI-driven insights to take
                    center stage.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalBankerPortfolio;
