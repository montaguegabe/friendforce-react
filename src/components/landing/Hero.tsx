import { Button } from "@/components/ui/button";
import { ArrowRight, Bell, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              Your personal relationship manager
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            No More Social Media.{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Stronger Real Connections.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            FriendsForce helps you remember birthdays, log meetups, and get reminders
            to reach out—without feeds, likes, or noise. Like Salesforce, but for the
            people who actually matter.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/dashboard">
              <Button size="lg" className="group">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Feature pills */}
          <div
            className="flex flex-wrap justify-center gap-4 pt-8 animate-fade-in opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-sm">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Organize Contacts</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-sm">
              <Bell className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Smart Reminders</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Log Interactions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
