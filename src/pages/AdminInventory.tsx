import { useState, useEffect } from 'react';
import { Package, Edit2, Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Product, Inventory, Branch } from '../lib/supabase';

type InventoryWithDetails = Inventory & {
  products: Product;
  branches: Branch;
};

export default function AdminInventory() {
  const [inventory, setInventory] = useState<InventoryWithDetails[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showStockModal, setShowStockModal] = useState(false);
  const [editingStock, setEditingStock] = useState<InventoryWithDetails | null>(null);
  const [newStock, setNewStock] = useState(0);

  useEffect(() => {
    loadData();
  }, [selectedBranch]);

  const loadData = async () => {
    try {
      const { data: branchesData } = await supabase
        .from('branches')
        .select('*')
        .order('name');

      if (branchesData) setBranches(branchesData);

      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (productsData) setProducts(productsData);

      let query = supabase
        .from('inventory')
        .select('*, products(*), branches(*)');

      if (selectedBranch !== 'all') {
        query = query.eq('branch_id', selectedBranch);
      }

      const { data: inventoryData } = await query.order('updated_at', { ascending: false });

      if (inventoryData) {
        setInventory(inventoryData as InventoryWithDetails[]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openStockModal = (item: InventoryWithDetails) => {
    setEditingStock(item);
    setNewStock(item.stock);
    setShowStockModal(true);
  };

  const updateStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStock) return;

    try {
      const { error } = await supabase
        .from('inventory')
        .update({ stock: newStock, updated_at: new Date().toISOString() })
        .eq('id', editingStock.id);

      if (!error) {
        setInventory(
          inventory.map((item) =>
            item.id === editingStock.id ? { ...item, stock: newStock } : item
          )
        );
        setShowStockModal(false);
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.products.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.products.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Sin stock', color: 'bg-red-100 text-red-800' };
    if (stock < 10) return { text: 'Stock bajo', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Stock normal', color: 'bg-green-100 text-green-800' };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Inventario</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por sucursal</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todas las sucursales</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar producto</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nombre o categoría..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Producto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sucursal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => {
                  const status = getStockStatus(item.stock);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              src={item.products.image_url || 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg'}
                              alt={item.products.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.products.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {item.products.category || 'Sin categoría'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{item.branches.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">{item.stock}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          ${item.products.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => openStockModal(item)}
                          className="text-blue-600 hover:text-blue-900 inline-flex items-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Editar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No se encontró inventario</p>
            </div>
          )}
        </div>
      </div>

      {showStockModal && editingStock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Actualizar Stock</h2>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Producto</p>
              <p className="text-lg font-semibold text-gray-900">{editingStock.products.name}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">Sucursal</p>
              <p className="text-lg font-semibold text-gray-900">{editingStock.branches.name}</p>
            </div>

            <form onSubmit={updateStock} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock actual: {editingStock.stock}
                </label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  onClick={() => setShowStockModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-md transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}