import { Bell, Calendar, Heart, Mail, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Smart Contact Groups",
    description: "Organize friends, mentors, and professional contacts into meaningful groups. Import from your phone or add manually.",
    color: "primary",
  },
  {
    icon: Bell,
    title: "Timely Reminders",
    description: "Never miss a birthday, anniversary, or the perfect time to reach out. Set custom frequencies for each relationship.",
    color: "accent",
  },
  {
    icon: Calendar,
    title: "Interaction Logging",
    description: "Track coffee chats, calls, and meetups. Know exactly when you last connected with anyone in your circle.",
    color: "primary",
  },
  {
    icon: Mail,
    title: "Email Campaigns",
    description: "Send thoughtful updates to your groups. Keep everyone in the loop without social media noise.",
    color: "accent",
  },
  {
    icon: Heart,
    title: "Life Events",
    description: "Remember the details that matter—kids' birthdays, anniversaries, career milestones, and more.",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Stale Relationship Alerts",
    description: "Get gentle nudges when it's been too long since you connected with someone important.",
    color: "accent",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything you need to nurture{" "}
            <span className="text-primary">real relationships</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple tools designed for intentional connection, not endless scrolling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card shadow-sm hover:shadow-md transition-all duration-300 border border-border/50 hover:border-primary/20 animate-fade-in-up opacity-0"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                  feature.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : "bg-accent/10 text-accent"
                }`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
