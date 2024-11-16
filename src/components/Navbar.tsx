import { ShoppingCart, User } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { Button } from '@/components/ui/button';
import { authModalState, cartOpenState } from '@/store/atoms';

export function Navbar() {
  const [, setAuthModal] = useRecoilState(authModalState);
  const [, setCartOpen] = useRecoilState(cartOpenState);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a0f00]/95 backdrop-blur-sm border-b border-[#3d2415]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white text-xl font-bold">Artisan Coffee</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Home</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Menu</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">About</a>
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCartOpen(true)}
              className="text-gray-300 hover:text-white"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setAuthModal('login')}
              className="text-gray-300 hover:text-white"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}