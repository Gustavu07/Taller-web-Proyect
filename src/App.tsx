import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import ChatBot from './components/ChatBot';
import AdminBranches from './pages/AdminBranches';
import AdminPersonal from './pages/AdminPersonal';
import AdminHorarios from './pages/AdminHorarios';
import AdminAsignacionCorporativas from './pages/AdminAsignacionCorporativas';
import AdminInventarios from './pages/AdminInventarios';
import AdminLotes from './pages/AdminLotes';
import AdminMarca from './pages/AdminMarca';
//import {APIProvider, Map} from '@vis.gl/react-google-maps';

type View = 'landing' | 'chat' | 'admin-branches' | 'admin-personal' | 'admin-horarios' | 'admin-asignaciones' | 'admin-inventory' | 'admin-lotes' | 'admin-marcas' | 'admin-productos';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing />;
      case 'chat':
        return <ChatBot />;
      case 'admin-branches':
        return <AdminBranches />;
      case 'admin-personal':
        return <AdminPersonal />;
      case 'admin-horarios':
        return <AdminHorarios />;
      case 'admin-asignaciones':
        return <AdminAsignacionCorporativas />;
      case 'admin-inventory':
        return <AdminInventarios />;
      case 'admin-lotes':
        return <AdminLotes />;
      case 'admin-marcas':
        return <AdminMarca />;
      default:
        return <Landing />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar currentView={currentView} onNavigate={setCurrentView} />
        {renderView()}
      </div>
    </AuthProvider>
  );
}

export default App;
