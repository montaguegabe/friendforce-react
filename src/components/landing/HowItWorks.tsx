import { Clock, MessageCircle, UserPlus } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Add Your People",
    description: "Import contacts or add them manually. Categorize as friends, mentors, or professional connections.",
  },
  {
    number: "02",
    icon: Clock,
    title: "Set Your Rhythm",
    description: "Decide how often you want to connect with each person. Daily coffee buddies or quarterly mentors—you choose.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Stay Connected",
    description: "Get timely reminders, log your interactions, and never let important relationships fade.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Three simple steps to better relationships
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-fade-in-up opacity-0"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-border">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {step.number.split('')[1]}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
