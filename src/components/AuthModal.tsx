import { useRecoilState } from 'recoil';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authModalState } from '@/store/atoms';

export function AuthModal() {
  const [authModal, setAuthModal] = useRecoilState(authModalState);

  return (
    <Dialog open={authModal !== null} onOpenChange={() => setAuthModal(null)}>
      <DialogContent className="sm:max-w-[425px] bg-[#2c1810] text-white border-[#3d2415]">
        <DialogHeader>
          <DialogTitle>{authModal === 'login' ? 'Login' : 'Register'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="bg-[#1a0f00] border-[#3d2415]"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="bg-[#1a0f00] border-[#3d2415]"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button className="bg-[#c8a27b] hover:bg-[#a67e5c] text-white">
            {authModal === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
          
          <Button
            variant="link"
            className="text-[#c8a27b]"
            onClick={() => setAuthModal(authModal === 'login' ? 'register' : 'login')}
          >
            {authModal === 'login'
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}