import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState, AppDispatch } from '@/store';
import { toggleTheme } from '@/store/slices/uiSlice';
import { fetchCategories } from '@/store/slices/categorySlice';
import { fetchReviews } from '@/store/slices/reviewSlice';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, MagnifyingGlassIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import { Category } from '@/store/slices/categorySlice';
import FeaturedCards from '@/components/home/FeaturedCards';
import { selectReviews } from '@/store/slices/reviewSlice';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  const categories = useSelector((state: RootState) => state.categories.items.data || []);
  const featuredReviews = useSelector(selectReviews);
  console.log("🚀 ~ MainLayout ~ featuredReviews:", featuredReviews)

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReviews({}));
  }, [dispatch]);

  // Handle scroll event to hide categories header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isSearchExpanded && 
          searchInputRef.current && 
          !searchInputRef.current.contains(event.target as Node)) {
        setIsSearchExpanded(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchExpanded]);

  // Focus input when search is expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', searchQuery);
  };

  const handleCategoryHover = (categoryId: string | null) => {
    setHoveredCategory(categoryId);
  };

  // Recursive function to render categories and subcategories
  const renderCategories = (categories: Category[], isDropdown: boolean = false, isNested: boolean = false, parentPath: string = '') => {
    if (!categories || categories.length === 0) {
      return (
        <span className={`${isDropdown ? 'block px-4 py-2 text-sm text-gray-500 dark:text-gray-400' : 'text-gray-400'}`}>
          No categories found
        </span>
      );
    }

    return categories.map((category) => {
      const hasSubcategories = category.subcategories && category.subcategories.length > 0;
      const isHovered = hoveredCategory === category.id;
      const path = parentPath ? `${parentPath}/${category.slug}` : `/${category.slug}`;
      
      if (isDropdown) {
        return (
          <div 
            key={category.id}
            ref={(el) => categoryRefs.current[category.id] = el}
            className="relative"
            onMouseEnter={() => handleCategoryHover(category.id)}
            onMouseLeave={() => hasSubcategories ? null : handleCategoryHover(null)}
          >
            <Link
              href={path}
              className={`block px-4 py-2 text-sm ${isNested ? 'pl-8' : ''} text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-between`}
              onClick={() => setIsCategoryDropdownOpen(false)}
            >
              {category.name}
              {hasSubcategories && <ChevronRightIcon className="ml-2 h-4 w-4" />}
            </Link>
            
            {hasSubcategories && isHovered && (
              <div className="absolute left-full top-0 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {renderCategories(category.subcategories, true, true, path)}
                </div>
              </div>
            )}
          </div>
        );
      } else {
        // For the categories header
        return (
          <div 
            key={category.id}
            className="relative group"
            onMouseEnter={() => handleCategoryHover(category.id)}
            onMouseLeave={() => handleCategoryHover(null)}
          >
            <Link
              href={path}
              className="text-gray-300 hover:text-white transition-colors whitespace-nowrap flex items-center"
            >
              {category.name}
              {hasSubcategories && <ChevronDownIcon className="ml-1 h-3 w-3" />}
            </Link>
{/*             
            {hasSubcategories && isHovered && (
              <div className="absolute left-0 top-full mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  {renderCategories(category.subcategories, true)}
                </div>
              </div>
            )} */}
          </div>
        );
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                GadgetReview
              </Link>
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Home
                </Link>
                
                {/* Categories dropdown in main header */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  >
                    Sections
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>
                  
                  {isCategoryDropdownOpen && (
                    <div 
                      className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10"
                      onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                    >
                      <div className="py-1">
                        {renderCategories(categories, true)}
                      </div>
                    </div>
                  )}
                </div>
                
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Show search icon in main header when scrolled (secondary header hidden) */}
              {scrolled && (
                <div className="relative hidden md:block">
                  {isSearchExpanded ? (
                    <form onSubmit={handleSearch} className="absolute right-0 top-0 w-64">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                      </button>
                      <button 
                        type="button" 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setIsSearchExpanded(false)}
                      >
                        <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setIsSearchExpanded(true)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                      aria-label="Search"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                    </button>
                  )}
                </div>
              )}
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isDarkMode ? (
                  <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Categories Dropdown */}
              <div className="block px-3 py-2">
                <button
                  className="flex items-center w-full text-left rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                >
                  Sections
                  <ChevronDownIcon className={`ml-1 h-5 w-5 transform ${isCategoryDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
                </button>
                
                {isCategoryDropdownOpen && (
                  <div className="mt-2 pl-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-600">
                    {categories.map((category: Category) => (
                      <div key={category.id}>
                        <Link
                          href={`/category/${category.slug}`}
                          className="block py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                        
                        {/* Mobile subcategories */}
                        {category.subcategories && category.subcategories.length > 0 && (
                          <div className="pl-4 space-y-1 border-l border-gray-200 dark:border-gray-700">
                            {category.subcategories.map((subcat) => (
                              <Link
                                key={subcat.id}
                                href={`/category/${category.slug}/${subcat.slug}`}
                                className="block py-1 text-sm text-gray-500 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subcat.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Mobile search */}
              {isSearchExpanded ? (
                <form onSubmit={handleSearch} className="mt-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-10 pr-10 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                  </button>
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setIsSearchExpanded(false)}
                  >
                    <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="w-full py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Search
                </button>
              )}
              
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Categories header - matches footer background and hides on scroll */}
      <div className={`bg-gray-900 text-white shadow-md transition-all duration-300 ${scrolled ? 'hidden' : 'block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {isSearchExpanded ? (
            // Expanded search form that covers the entire header
            <div className="relative w-full">
              <form onSubmit={handleSearch} className="w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search reviews, products, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-10 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </button>
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setIsSearchExpanded(false)}
                >
                  <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
                </button>
              </form>
            </div>
          ) : (
            // Normal view with categories and search icon
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="font-semibold mr-2">Categories:</span>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {renderCategories(categories)}
                </div>
              </div>
              
              {/* Search icon that expands when clicked */}
              <button 
                onClick={() => setIsSearchExpanded(true)}
                className="p-2 rounded-full hover:bg-gray-800 transition-all duration-200"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-300 hover:text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Featured Cards Section - below secondary header */}
      {/* {featuredReviews && featuredReviews.length > 0 && (
        <FeaturedCards featuredReviews={featuredReviews} />
      )} */}

      {/* Horizontal ad space below secondary header */}
      <div className="w-full bg-gray-100 dark:bg-gray-700 border-t border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="h-[200px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Advertisement</p>
              <div className="mt-4 text-gray-400 dark:text-gray-500">
                {/* Horizontal ad banner will be inserted here */}
                <p className="italic">Google Ad Space</p>
                <p className="text-xs mt-2">970x200 ad unit</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
