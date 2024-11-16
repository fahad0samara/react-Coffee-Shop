import { RecoilRoot } from 'recoil';
import { Coffee, ChevronDown, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRecoilState } from 'recoil';
import { cartState } from '@/store/atoms';
import { Navbar } from '@/components/Navbar';
import { AuthModal } from '@/components/AuthModal';
import { Cart } from '@/components/Cart';
import { useToast } from './hooks/use-toast';
const coffeeProducts = [
  {
    id: '1',
    name: 'Espresso Blend',
    description: 'Rich and bold with caramel undertones',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Ethiopian Yirgacheffe',
    description: 'Floral aroma with citrus notes',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Colombian Supreme',
    description: 'Smooth body with chocolate finish',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop'
  }
];

function AppContent() {
  const [cart, setCart] = useRecoilState(cartState);
  const { toast } = useToast();

  const addToCart = (product: typeof coffeeProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#1a0f00]">
      <Navbar />
      <AuthModal />
      <Cart />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1920&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)'
          }}
        />
        
        <div className="relative z-10 text-center px-4 mt-16">
          <div className="flex items-center justify-center mb-6">
            <Coffee className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold">Artisan Coffee</h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Experience the perfect blend of tradition and innovation
          </p>
          <Button size="lg" className="bg-[#c8a27b] hover:bg-[#a67e5c] text-white">
            Explore Our Collection
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white opacity-75" />
        </div>
      </header>

      {/* Products Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1a0f00] to-[#2a1f10]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Featured Blends
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coffeeProducts.map((product) => (
              <Card key={product.id} className="bg-[#2c1810] border-[#3d2415] text-white overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => addToCart(product)}
                      className="bg-[#c8a27b] hover:bg-[#a67e5c] text-white"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#c8a27b] text-lg font-bold">${product.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AppContent />
    </RecoilRoot>
  );
}

export default App;

