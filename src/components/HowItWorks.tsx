export const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      text: "Agents continuously reallocates your assets across chains and protocols to maximize yield",
    },
    {
      number: 2,
      text: "Agent tracks the best risk-adjusted yield across chains so your assets are in the right place",
    },
    {
      number: 3,
      text: "Because bridging may be needed, withdrawals can take up to 24h",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold uppercase">How It Works</h2>
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="space-y-4">
              <div className="w-12 h-12 rounded-full border-2 border-chart-green flex items-center justify-center">
                <span className="text-chart-green font-bold">{step.number}</span>
              </div>
              <p className="text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
