
import React from 'react';
import { DS160Form } from '@/components/DS160Form';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-visa-700 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg 
                className="w-8 h-8 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                />
              </svg>
              <h1 className="text-2xl font-bold">DS-160 Visa Application</h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="hover:text-visa-200">Home</a>
                </li>
                <li>
                  <a href="#" className="hover:text-visa-200">Help</a>
                </li>
                <li>
                  <a href="#" className="hover:text-visa-200">Contact</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <DS160Form />
      </main>
      
      <footer className="bg-visa-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 DS-160 Application System</p>
              <p className="text-sm text-visa-200">Securely process your visa applications</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-visa-200 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-visa-200 hover:text-white">Terms of Service</a>
              <a href="#" className="text-visa-200 hover:text-white">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
