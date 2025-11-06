import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{
    id: string;
    text: string;
    points: Record<string, number>;
  }>;
}

interface SkinTypeResult {
  name: string;
  description: string;
  characteristics: string[];
}

interface QuizData {
  quiz: QuizQuestion[];
  results: Record<string, SkinTypeResult>;
}

const SkinInsights = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [skinType, setSkinType] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Mock quiz data - replace with actual data loading
    const mockQuizData: QuizData = {
      quiz: [
        {
          id: 1,
          question: "How does your skin feel after cleansing?",
          options: [
            { id: "a", text: "Tight and uncomfortable", points: { dry: 3, oily: 0, combination: 1, sensitive: 2 } },
            { id: "b", text: "Smooth and comfortable", points: { dry: 0, oily: 0, combination: 3, sensitive: 0 } },
            { id: "c", text: "Oily, especially in the T-zone", points: { dry: 0, oily: 3, combination: 2, sensitive: 0 } },
            { id: "d", text: "Slightly irritated or red", points: { dry: 1, oily: 0, combination: 0, sensitive: 3 } }
          ]
        },
        {
          id: 2,
          question: "How often do you experience breakouts?",
          options: [
            { id: "a", text: "Rarely or never", points: { dry: 3, oily: 0, combination: 1, sensitive: 1 } },
            { id: "b", text: "Occasionally", points: { dry: 1, oily: 1, combination: 3, sensitive: 2 } },
            { id: "c", text: "Frequently", points: { dry: 0, oily: 3, combination: 2, sensitive: 0 } },
            { id: "d", text: "With irritation and redness", points: { dry: 0, oily: 1, combination: 0, sensitive: 3 } }
          ]
        },
        {
          id: 3,
          question: "What's the appearance of your pores?",
          options: [
            { id: "a", text: "Small and barely visible", points: { dry: 3, oily: 0, combination: 1, sensitive: 2 } },
            { id: "b", text: "Normal sized", points: { dry: 1, oily: 1, combination: 3, sensitive: 1 } },
            { id: "c", text: "Large and noticeable", points: { dry: 0, oily: 3, combination: 2, sensitive: 0 } },
            { id: "d", text: "Varies, sometimes appear inflamed", points: { dry: 0, oily: 1, combination: 1, sensitive: 3 } }
          ]
        },
        {
          id: 4,
          question: "How does your skin react to new products?",
          options: [
            { id: "a", text: "Absorbs well without issues", points: { dry: 2, oily: 2, combination: 3, sensitive: 0 } },
            { id: "b", text: "Sometimes causes excess oil", points: { dry: 0, oily: 3, combination: 2, sensitive: 0 } },
            { id: "c", text: "Often causes dryness", points: { dry: 3, oily: 0, combination: 1, sensitive: 1 } },
            { id: "d", text: "Frequently causes irritation or redness", points: { dry: 0, oily: 0, combination: 0, sensitive: 3 } }
          ]
        },
        {
          id: 5,
          question: "By midday, how does your skin look?",
          options: [
            { id: "a", text: "Dull and flaky", points: { dry: 3, oily: 0, combination: 0, sensitive: 1 } },
            { id: "b", text: "Fresh and balanced", points: { dry: 1, oily: 1, combination: 3, sensitive: 2 } },
            { id: "c", text: "Shiny, especially on forehead and nose", points: { dry: 0, oily: 3, combination: 2, sensitive: 0 } },
            { id: "d", text: "Red or blotchy patches appear", points: { dry: 0, oily: 0, combination: 0, sensitive: 3 } }
          ]
        }
      ],
      results: {
        dry: {
          name: "Dry Skin",
          description: "Your skin produces less sebum than normal, leading to a lack of lipids needed to retain moisture and build a protective barrier.",
          characteristics: [
            "Feels tight, especially after cleansing",
            "Flaky or rough texture",
            "Fine lines may be more visible",
            "May feel itchy or irritated",
            "Small, barely visible pores"
          ]
        },
        oily: {
          name: "Oily Skin",
          description: "Your skin produces excess sebum, which can lead to a shiny appearance and enlarged pores.",
          characteristics: [
            "Shiny or greasy appearance",
            "Enlarged, visible pores",
            "Prone to blackheads and breakouts",
            "Makeup may not stay in place",
            "Less prone to wrinkles"
          ]
        },
        combination: {
          name: "Combination Skin",
          description: "You have a mix of skin types, typically oily in the T-zone (forehead, nose, and chin) and normal to dry on the cheeks.",
          characteristics: [
            "Oily T-zone with larger pores",
            "Normal to dry cheeks",
            "May experience breakouts in oily areas",
            "Different areas need different care",
            "Balanced in some areas, problematic in others"
          ]
        },
        sensitive: {
          name: "Sensitive Skin",
          description: "Your skin is more prone to react to certain stimuli that normal skin wouldn't react to, including environmental factors and specific ingredients.",
          characteristics: [
            "Easily irritated by products or environment",
            "Prone to redness and inflammation",
            "May feel burning or stinging",
            "Reacts to temperature changes",
            "Requires gentle, fragrance-free products"
          ]
        }
      }
    };
    
    setTimeout(() => {
      setQuizData(mockQuizData);
      setLoading(false);
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleNext = () => {
    if (currentQuestion < (quizData?.quiz.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateSkinType();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateSkinType = () => {
    if (!quizData) return;

    const scores: Record<string, number> = { dry: 0, oily: 0, combination: 0, sensitive: 0 };

    quizData.quiz.forEach((question) => {
      const selectedOptionId = answers[question.id];
      if (selectedOptionId) {
        const selectedOption = question.options.find((opt) => opt.id === selectedOptionId);
        if (selectedOption) {
          Object.keys(scores).forEach((type) => {
            scores[type] += selectedOption.points[type] || 0;
          });
        }
      }
    });

    const maxScore = Math.max(...Object.values(scores));
    const detectedType = Object.keys(scores).find((type) => scores[type] === maxScore) || 'combination';
    setSkinType(detectedType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSkinType(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading your skin insights...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / (quizData?.quiz.length || 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center text-2xl">
                ✨
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Skin Insights</h1>
                <p className="text-sm text-muted-foreground">
                  Discover your unique skin profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!skinType ? (
          <div className="animate-fade-in">
            {/* Progress Header */}
            <Card className="p-8 mb-8 border-2 shadow-elegant">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">
                    Question {currentQuestion + 1} of {quizData?.quiz.length}
                  </span>
                </div>
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </Card>

            {/* Question Card */}
            {quizData && (
              <Card className="p-8 shadow-elegant border-2 animate-fade-in">
                <h2 className="text-2xl font-bold mb-8 text-foreground">
                  {quizData.quiz[currentQuestion].question}
                </h2>

                <div className="space-y-4 mb-8">
                  {quizData.quiz[currentQuestion].options.map((option) => {
                    const isSelected = answers[quizData.quiz[currentQuestion].id] === option.id;
                    return (
                      <label
                        key={option.id}
                        className={`flex items-start p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5 shadow-md scale-[1.02]'
                            : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                        }`}
                      >
                        <div className="flex items-center flex-1">
                          <input
                            type="radio"
                            name={`question-${quizData.quiz[currentQuestion].id}`}
                            value={option.id}
                            checked={isSelected}
                            onChange={() => handleAnswer(quizData.quiz[currentQuestion].id, option.id)}
                            className="w-5 h-5 text-primary focus:ring-primary focus:ring-offset-2 mr-4"
                          />
                          <span className={`flex-1 ${isSelected ? 'font-medium text-primary' : 'text-foreground'}`}>
                            {option.text}
                          </span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-primary ml-2" />}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between gap-4">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!answers[quizData.quiz[currentQuestion].id]}
                    size="lg"
                    className="flex items-center gap-2 gradient-primary"
                  >
                    {currentQuestion === quizData.quiz.length - 1 ? 'See Results' : 'Next'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            {/* Results Card */}
            <Card className="p-8 border-2 border-primary/20 shadow-xl bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl">
                  🎯
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground">
                    {quizData?.results[skinType].name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">Your personalized skin profile</p>
                </div>
              </div>

              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                {quizData?.results[skinType].description}
              </p>

              <div className="bg-white rounded-2xl p-6 border-2 border-border">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <span className="text-xl">📋</span>
                  Key Characteristics
                </h3>
                <ul className="space-y-3">
                  {quizData?.results[skinType].characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80">{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={resetQuiz}
                size="lg"
                variant="outline"
                className="mt-6 w-full sm:w-auto flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </Button>
            </Card>

            {/* Next Steps */}
            <Card className="p-8 shadow-elegant">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                What's Next?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border-2 border-border card-hover bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="text-3xl mb-3">💊</div>
                  <h4 className="font-semibold mb-2">Recommended Products</h4>
                  <p className="text-sm text-muted-foreground">
                    Doctor-approved products for your skin type
                  </p>
                </div>
                <div className="p-5 rounded-xl border-2 border-border card-hover bg-gradient-to-br from-accent/5 to-transparent">
                  <div className="text-3xl mb-3">🥗</div>
                  <h4 className="font-semibold mb-2">Diet Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    Nutrition tips for healthy, glowing skin
                  </p>
                </div>
                <div className="p-5 rounded-xl border-2 border-border card-hover bg-gradient-to-br from-success/5 to-transparent">
                  <div className="text-3xl mb-3">⚠️</div>
                  <h4 className="font-semibold mb-2">Precautions</h4>
                  <p className="text-sm text-muted-foreground">
                    Essential care tips for your skin
                  </p>
                </div>
                <div className="p-5 rounded-xl border-2 border-border card-hover bg-gradient-to-br from-primary/5 to-transparent">
                  <div className="text-3xl mb-3">🏥</div>
                  <h4 className="font-semibold mb-2">Common Conditions</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn about skin conditions & treatments
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-white shadow-xl border-2 border-primary/20 flex items-center justify-center text-primary hover:shadow-2xl hover:scale-110 transition-all"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SkinInsights;
