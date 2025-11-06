import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';

interface DietItem {
  category: string;
  items: string[];
  benefit?: string;
  reason?: string;
}

interface LifestyleTip {
  title: string;
  description: string;
  benefit: string;
}

const DietPlan = () => {
  const [dietLifestyle, setDietLifestyle] = useState<{ diet: { eat: DietItem[]; avoid: DietItem[] }; lifestyle: LifestyleTip[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/diet-lifestyle.json');
        const data = await response.json();
        setDietLifestyle(data);
      } catch (error) {
        console.error('Error loading diet & lifestyle data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading diet & lifestyle tips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-2xl">
                🥗
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Diet Plan</h1>
                <p className="text-sm text-muted-foreground">
                  Nutrition tips for healthy, glowing skin
                </p>
              </div>
            </div>
            <Button onClick={() => navigate('/skin-insights')} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {dietLifestyle && (
          <>
            {/* Diet Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in">
              {/* Eat Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-success flex items-center gap-2">
                  <CheckCircle2 className="w-7 h-7" />
                  Foods to Eat
                </h2>
                <div className="space-y-4">
                  {dietLifestyle.diet.eat.map((category, idx) => (
                    <Card
                      key={idx}
                      className="p-5 shadow-elegant border-2 border-success/20 bg-gradient-to-br from-success/5 to-transparent"
                    >
                      <h3 className="font-semibold mb-3 text-foreground">{category.category}</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm mb-3">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-foreground/80">{item}</li>
                        ))}
                      </ul>
                      {category.benefit && (
                        <p className="text-xs italic text-success bg-success/10 p-3 rounded-lg border border-success/20">
                          💡 {category.benefit}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>

              {/* Avoid Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-destructive flex items-center gap-2">
                  <X className="w-7 h-7" />
                  Foods to Avoid
                </h2>
                <div className="space-y-4">
                  {dietLifestyle.diet.avoid.map((category, idx) => (
                    <Card
                      key={idx}
                      className="p-5 shadow-elegant border-2 border-destructive/20 bg-gradient-to-br from-destructive/5 to-transparent"
                    >
                      <h3 className="font-semibold mb-3 text-foreground">{category.category}</h3>
                      <ul className="list-disc list-inside space-y-2 text-sm mb-3">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="text-foreground/80">{item}</li>
                        ))}
                      </ul>
                      {category.reason && (
                        <p className="text-xs italic text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                          ⚠️ {category.reason}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Lifestyle Tips */}
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">🌱</span>
                Lifestyle Recommendations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dietLifestyle.lifestyle.map((tip, idx) => (
                  <Card
                    key={idx}
                    className="p-6 shadow-elegant border-2 card-hover bg-gradient-to-br from-primary/5 to-accent/5"
                  >
                    <h3 className="font-semibold text-lg mb-3 text-foreground">{tip.title}</h3>
                    <p className="text-sm mb-3 text-foreground/80">{tip.description}</p>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <p className="text-sm text-primary">
                        <strong className="font-semibold">Benefit:</strong> {tip.benefit}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DietPlan;
