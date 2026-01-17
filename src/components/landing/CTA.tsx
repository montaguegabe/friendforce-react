import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-2xl" />

          <div className="relative px-8 py-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 max-w-3xl mx-auto">
              Ready to build stronger relationships?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl mx-auto">
              Join thousands who've replaced social media scrolling with meaningful connections.
            </p>
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-lg group"
              >
                Start Free Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
