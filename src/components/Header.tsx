import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Menu, Phone, MapPin, Clock, Home } from 'lucide-react';
import { CartDropdown } from '@/features/cart/components/CartDropdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

// Using public path for the logo
const logo = '/logo.png';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/shop', label: 'Shop' },
    { href: '/services', label: 'Services' },
    { href: '/brands', label: 'Brands' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];
  
  const { pathname } = useLocation();

  return (
    <>
      {/* Top bar */}
      <div className="bg-secondary text-white py-2 text-sm">
        <div className="container-main flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Kanniyakumari, TamilNadu</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Mon-Sat: 9AM-8PM</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-main">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Kavita Cooler Services Logo" 
                className="h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-secondary">Kavita Cooler Services</h1>
                <p className="text-xs text-muted-foreground">Authorized Dealers & Service</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-1.5 text-secondary font-medium hover:text-primary transition-colors duration-200',
                      isActive && 'text-primary font-semibold'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center gap-4">
              
              {/* Search */}
              <div className="hidden md:flex items-center gap-2">
                {isSearchOpen ? (
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                      <Search className="h-5 w-5" />
                    </Button>
                    <CartDropdown />
                    <span className="hidden md:inline-block">
                      <Button asChild>
                        <Link to="/contact">Book Service</Link>
                      </Button>
                    </span>
                  </div>
                ) : (
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Cart Dropdown */}
              <div className="relative">
                <CartDropdown />
              </div>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-6 mt-8">
                    
                    {/* Mobile Search */}
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search appliances..." />
                      <Button size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col gap-2">
                      {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                          <NavLink
                            key={item.href}
                            to={item.href}
                            className={cn(
                              'flex items-center gap-3 text-lg font-medium py-3 px-3 rounded-lg transition-colors duration-200',
                              isActive 
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-secondary hover:bg-accent/50'
                            )}
                          >
                            {Icon && <Icon className="h-5 w-5" />}
                            {item.label}
                          </NavLink>
                        );
                      })}
                    </nav>

                    {/* Contact Info */}
                    <div className="border-t pt-6 space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="font-medium">+91 98765 43210</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-sm">Mumbai, Maharashtra</span>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;