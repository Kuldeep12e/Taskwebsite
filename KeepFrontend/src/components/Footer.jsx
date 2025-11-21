import { CheckSquare, Plus, LayoutDashboard } from 'lucide-react';

export default function Footer(){
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CheckSquare className="w-6 h-6 text-indigo-600" />
                <span className="text-xl font-bold text-gray-800">Keep</span>
              </div>
              <p className="text-gray-600">
                Your personal task management solution for a more productive life.
              </p>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Keep. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}   