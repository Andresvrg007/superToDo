import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { DailyTasks } from '../components/DailyTasks';
import { AddTaskModal } from '../components/AddTask';
const BACKEND = import.meta.env.VITE_API_URL;

interface Task {
  id: number;
  tittle: string;
  description: string;
  user_id: number;
  complete: number;
}

export const Dashboard = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('daily');
    const [dailyTasks, setDailyTasks] = useState<Task[]>([]); 
    const [showComponent, setShowComponent] = useState(false);
    

    useEffect(() => {
            // Check if user is already logged in
            const checkLoginStatus = async () => {
                const res = await fetch(`${BACKEND}/check-login`, {
                    method: "GET",
                    credentials: 'include',
                });
                if (!res.ok) {
                    navigate('/'); // Redirect to dashboard if logged in
                }
            };
            checkLoginStatus();
        
        },[]);

        useEffect(() => {
            const dailyTasks = async () => {
                const res = await fetch(`${BACKEND}/daily-tasks`, {
                    method: "GET",
                    credentials: 'include',
                });
                if (!res.ok) {
                    console.error('Failed to fetch daily tasks');
                }
                else{
                    const data = await res.json();
                    setDailyTasks(data);
                }
            }
            dailyTasks();
        },[]);

    const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Cerrar menú móvil al seleccionar
  };

  const handleAddTask = () => {
    setShowComponent(true);
  }
   const handleLogout = async () => {
    const res = await fetch(`${BACKEND}/logout`, {
      method: "GET",
      credentials: 'include',
    });
    if (res.ok) {
      navigate('/'); 
    } else {
      console.error('Logout failed');
    }
  };

  
  const getSectionTitle = () => {
    switch (activeSection) {
      case 'daily': return 'Daily Tasks';
      case 'favorites': return 'Favorites';
      case 'infinite': return 'Infinite Tasks';
      default: return 'Tasks';
    }
  };
    
    return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Hamburger Menu */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">SuperToDo</h1>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {/* Hamburger Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`px-4 py-2 bg-white border-t border-gray-200 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <nav className="space-y-1">
            <button 
              onClick={() => handleSectionChange('daily')}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'daily' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Daily Tasks
            </button>
            <button 
              onClick={() => handleSectionChange('favorites')}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'favorites' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Favorites
            </button>
            <button 
              onClick={() => handleSectionChange('infinite')}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                activeSection === 'infinite' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Infinite Tasks
            </button>
            <button 
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="w-64 bg-white shadow-sm border-r border-gray-200 relative min-h-screen">
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">SuperToDo</h1>
            </div>
            
            {/* Navigation */}
            <nav className="mt-8 px-4">
              <div className="space-y-2">
                <button 
                  onClick={() => handleSectionChange('daily')}
                  className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
                    activeSection === 'daily' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Daily Tasks
                </button>
                
                <button 
                  onClick={() => handleSectionChange('favorites')}
                  className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
                    activeSection === 'favorites' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Favorites
                </button>
                
                <button 
                  onClick={() => handleSectionChange('infinite')}
                  className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${
                    activeSection === 'infinite' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Infinite Tasks
                </button>
              </div>
              
              {/* Logout Button at Bottom */}
              <div className="absolute bottom-4 left-4 right-4">
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Content Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">{getSectionTitle()}</h2>
              
              {/* ✅ Botón limpio sin el modal dentro */}
              <button 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
                onClick={handleAddTask}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              
              {activeSection === 'daily' ? (
                <DailyTasks dailyTasks={dailyTasks}/>
              ) : (
                <p className="text-gray-500 text-center py-12">
                  Your {getSectionTitle().toLowerCase()} will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      
      {showComponent && (
        <AddTaskModal 
          isOpen={showComponent}
          setShowComponent={setShowComponent}
          setDailyTasks={setDailyTasks}
        />
      )}
    </div>
  );
};