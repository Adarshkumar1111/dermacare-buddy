import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface Disease {
  id: number;
  name: string;
  skinTypes: string[];
  description: string;
  symptoms: string[];
  prevention: string[];
  severity: string;
}

const Diseases = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/diseases.json');
        const data = await response.json();
        setDiseases(data.diseases);
      } catch (error) {
        console.error('Error loading diseases:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredDiseases = selectedSkinType === 'all'
    ? diseases
    : diseases.filter((d) => d.skinTypes.includes(selectedSkinType));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading diseases...</p>
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
                🏥
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Common Conditions</h1>
                <p className="text-sm text-muted-foreground">
                  Learn about skin conditions & treatments
                </p>
              </div>
            </div>
            <Button onClick={() => navigate('/skin-insights')} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="border-t border-border bg-white/60 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4 overflow-x-auto">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                Filter by skin type:
              </span>
              <div className="flex gap-2">
                {['all', 'dry', 'oily', 'combination', 'sensitive'].map((type) => (
                  <Button
                    key={type}
                    onClick={() => setSelectedSkinType(type)}
                    variant={selectedSkinType === type ? 'default' : 'outline'}
                    size="sm"
                    className={selectedSkinType === type ? 'gradient-primary' : ''}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredDiseases.length} condition{filteredDiseases.length !== 1 ? 's' : ''}
            {selectedSkinType !== 'all' && ` relevant to ${selectedSkinType} skin`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {filteredDiseases.map((disease) => (
            <Card key={disease.id} className="p-6 shadow-elegant border-2 card-hover">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-foreground">{disease.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    disease.severity === 'Common' || disease.severity === 'Mild'
                      ? 'bg-success/10 text-success border border-success/20'
                      : disease.severity === 'Moderate'
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'bg-destructive/10 text-destructive border border-destructive/20'
                  }`}
                >
                  {disease.severity}
                </span>
              </div>
              <p className="mb-4 text-foreground/80">{disease.description}</p>
              
              <div className="mb-4 p-4 rounded-xl bg-secondary/30 border border-border">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Symptoms
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {disease.symptoms.map((symptom, idx) => (
                    <li key={idx} className="text-foreground/80">{symptom}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-lg">🛡️</span>
                  Prevention
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {disease.prevention.map((prev, idx) => (
                    <li key={idx} className="text-foreground/80">{prev}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {disease.skinTypes.map((type) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Diseases;
