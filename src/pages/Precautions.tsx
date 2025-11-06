import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

interface Precaution {
  id: number;
  title: string;
  description: string;
  importance: string;
  icon: string;
}

const getIconEmoji = (icon: string) => {
  const iconMap: Record<string, string> = {
    'test-tube': '🧪',
    'sun': '☀️',
    'shield': '🛡️',
    'moon': '🌙',
    'hand': '✋',
  };
  return iconMap[icon] || '⚠️';
};

const Precautions = () => {
  const [precautions, setPrecautions] = useState<Precaution[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/precautions.json');
        const data = await response.json();
        setPrecautions(data.precautions);
      } catch (error) {
        console.error('Error loading precautions:', error);
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
          <p className="text-muted-foreground">Loading precautions...</p>
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
                ⚠️
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Precautions</h1>
                <p className="text-sm text-muted-foreground">
                  Essential care tips for your skin
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
        <div className="space-y-6 animate-fade-in">
          {precautions.map((precaution) => (
            <Card
              key={precaution.id}
              className="p-6 shadow-elegant border-2 card-hover bg-gradient-to-br from-accent/5 to-transparent"
            >
              <div className="flex items-start gap-5">
                <div className="bg-accent/20 p-4 rounded-2xl flex-shrink-0 border-2 border-accent/30">
                  <span className="text-4xl">{getIconEmoji(precaution.icon)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                    <h2 className="text-xl font-semibold text-foreground">{precaution.title}</h2>
                  </div>
                  <p className="mb-4 text-foreground/80 leading-relaxed">{precaution.description}</p>
                  <div className="bg-accent/10 rounded-xl p-4 border-2 border-accent/20">
                    <p className="text-sm text-accent">
                      <strong className="font-semibold">Why it matters:</strong> {precaution.importance}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Precautions;
