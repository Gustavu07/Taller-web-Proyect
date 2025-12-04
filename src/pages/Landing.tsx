import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Branch, Product, SalesStats } from '../lib/supabase';
import AuthModal from '../components/AuthModal';

export default function Landing() {
  const [branch, setBranch] = useState<Branch | null>(null);
  const [topProducts, setTopProducts] = useState<(Product & { stats: SalesStats })[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    loadLandingData();
  }, []);

  const loadLandingData = async () => {
    try {
      const { data: branches } = await supabase
        .from('branches')
        .select('*')
        .eq('is_active', true)
        .limit(1)
        .single();

      if (branches) {
        setBranch(branches);

        const { data: stats } = await supabase
          .from('sales_stats')
          .select('*, products(*)')
          .eq('branch_id', branches.id)
          .order('total_sales', { ascending: false })
          .limit(6);

        if (stats) {
          const productsWithStats = stats.map(stat => ({
            ...(stat.products as unknown as Product),
            stats: {
              id: stat.id,
              product_id: stat.product_id,
              branch_id: stat.branch_id,
              total_sales: stat.total_sales,
              total_requests: stat.total_requests,
            },
          }));
          setTopProducts(productsWithStats);
        }
      }
    } catch (error) {
      console.error('Error loading landing data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${
            branch?.hero_image_url || 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg'
          })`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {branch?.name || 'Bienvenido a TechStore'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              La mejor tecnología al alcance de tus manos
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Sobre Nosotros</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {branch?.about_text ||
              'Somos líderes en tecnología, ofreciendo los mejores productos y servicio a nuestros clientes.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl font-bold text-gray-900">Productos Más Solicitados</h2>
            </div>
            <p className="text-lg text-gray-600">
              Los productos favoritos de nuestros clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="relative h-64 bg-gray-100">
                  <img
                    src={product.image_url || 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.is_promotion && (
                    <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Promoción
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                    {product.category && (
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 pt-3 border-t border-gray-200">
                    <span>Ventas: {product.stats.total_sales}</span>
                    <span>Solicitudes: {product.stats.total_requests}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TechStore</h3>
              <p className="text-gray-400">
                Tu tienda de tecnología de confianza
              </p>
            </div>

            {branch && (
              <div>
                <h4 className="text-lg font-semibold mb-4">Contacto</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400">{branch.address}</span>
                  </div>
                  {branch.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-400">{branch.phone}</span>
                    </div>
                  )}
                  {branch.email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-400">{branch.email}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-lg font-semibold mb-4">Horario</h4>
              <div className="text-gray-400 space-y-1">
                <p>Lunes a Viernes: 9:00 AM - 8:00 PM</p>
                <p>Sábados: 9:00 AM - 6:00 PM</p>
                <p>Domingos: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TechStore. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}