import { useRecoilState } from 'recoil';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cartOpenState, cartState } from '@/store/atoms';
import { Minus, Plus, Trash2 } from 'lucide-react';

export function Cart() {
  const [isOpen, setIsOpen] = useRecoilState(cartOpenState);
  const [cart, setCart] = useRecoilState(cartState);

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[400px] bg-[#2c1810] text-white border-l border-[#3d2415]">
        <SheetHeader>
          <SheetTitle className="text-white">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-[#1a0f00] p-4 rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">${item.price}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <span>{item.quantity}</span>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 ml-auto"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 ? (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#2c1810] border-t border-[#3d2415]">
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-[#c8a27b] hover:bg-[#a67e5c] text-white">
              Checkout
            </Button>
          </div>
        ) : (
          <div className="text-center mt-8 text-gray-400">
            Your cart is empty
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}