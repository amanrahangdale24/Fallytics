const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-lg text-white">Faillytics</span>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Faillytics. All rights reserved.
          </div>
          <div className="flex gap-6">
            <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">Privacy</p>
            <p  className="text-gray-400 hover:text-white transition-colors cursor-pointer">Terms</p>
            <p className="text-gray-400 hover:text-white transition-colors cursor-pointer">Contact</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;