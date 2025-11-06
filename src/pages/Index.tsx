import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          {/* Hero Section */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-primary mb-6 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Perfect Skin Type
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Take our personalized skin analysis quiz and get expert recommendations tailored just for you
            </p>
          </div>

          {/* CTA */}
          <div className="mb-16">
            <Button
              onClick={() => navigate('/skin-insights')}
              size="lg"
              className="gradient-primary text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              Start Your Skin Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-border shadow-md card-hover">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-lg mb-2">Personalized Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get accurate insights about your unique skin type
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-border shadow-md card-hover">
              <div className="text-4xl mb-4">💊</div>
              <h3 className="font-semibold text-lg mb-2">Expert Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Receive doctor-approved product suggestions
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border-2 border-border shadow-md card-hover">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="font-semibold text-lg mb-2">Complete Care Guide</h3>
              <p className="text-sm text-muted-foreground">
                Access diet plans, precautions, and skincare tips
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
