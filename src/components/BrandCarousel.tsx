import { Card } from '@/components/ui/card';

const BrandCarousel = () => {
  const brands = [
    { name: 'Godrej', logo: 'G', color: 'bg-blue-600' },
    { name: 'Panasonic', logo: 'P', color: 'bg-blue-700' },
    { name: 'Bosch', logo: 'B', color: 'bg-red-600' },
    { name: 'Siemens', logo: 'S', color: 'bg-cyan-600' },
    { name: 'Liebherr', logo: 'L', color: 'bg-blue-800' },
    { name: 'V Guard', logo: 'V', color: 'bg-orange-600' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container-main">
        <div className="text-center mb-8">
          <h2 className="text-section-title text-secondary mb-4">
            Authorized Partners
          </h2>
          <p className="text-body max-w-2xl mx-auto">
            We are proud authorized dealers and service providers for leading appliance brands, 
            ensuring genuine products and expert support.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Card 
              key={brand.name} 
              className="p-6 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-16 h-16 ${brand.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-white font-bold text-xl">{brand.logo}</span>
              </div>
              <h3 className="font-semibold text-secondary group-hover:text-primary transition-colors">
                {brand.name}
              </h3>
            </Card>
          ))}
        </div>

        {/* Trust message */}
        <div className="text-center mt-8">
          <p className="text-small">
            <span className="font-medium text-success">✓ Genuine Products</span> • 
            <span className="font-medium text-success ml-2">✓ Official Warranty</span> • 
            <span className="font-medium text-success ml-2">✓ Expert Service</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;