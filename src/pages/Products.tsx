import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  skinTypes: string[];
  description: string;
  price: string;
  rating: number;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = selectedSkinType === 'all'
    ? products
    : products.filter((p) => p.skinTypes.includes(selectedSkinType));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading products...</p>
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
                💊
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Recommended Products</h1>
                <p className="text-sm text-muted-foreground">
                  Doctor-approved products for your skin
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
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {selectedSkinType !== 'all' && ` for ${selectedSkinType} skin`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="p-5 shadow-elegant border-2 card-hover">
              <div className="aspect-square bg-secondary/30 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-4xl">🧴</span>
              </div>
              <h3 className="font-semibold text-lg mb-1 text-foreground">{product.name}</h3>
              <p className="text-sm mb-2 text-muted-foreground">{product.brand}</p>
              <p className="text-sm mb-4 text-foreground/80">{product.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-primary text-lg">{product.price}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.skinTypes.map((type) => (
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

export default Products;
