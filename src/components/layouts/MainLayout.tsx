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
import FeaturedCards from '@/components/home/FeaturedArticle';
import { selectReviews } from '@/store/slices/reviewSlice';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchCategory, setSearchCategory] = useState('all');
  const [isSearchCategoryDropdownOpen, setIsSearchCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchCategoryDropdownRef = useRef<HTMLDivElement>(null);

  const isDarkMode = useSelector((state: RootState) => state.ui.isDarkMode);
  const categories = useSelector((state: RootState) => state.categories.items.data || []);
  const featuredReviews = useSelector(selectReviews);

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

  // Close search category dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchCategoryDropdownRef.current &&
        !searchCategoryDropdownRef.current.contains(event.target as Node)) {
        setIsSearchCategoryDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when search is expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', searchQuery, 'Category:', searchCategory);
  };

  // Handle selecting search category
  const handleSearchCategorySelect = (category: string) => {
    setSearchCategory(category);
    setIsSearchCategoryDropdownOpen(false);
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 mx-auto w-full text-gray-900 dark:text-white">
      <header className="bg-white dark:bg-gray-800 shadow-xl sticky top-0 z-50 transition-all duration-300">
        {/* Brand color strip */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"></div>
        
        <nav className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Logo with enhanced animation */}
              <Link href="/" className="text-2xl font-extrabold relative group">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-600 transition-all duration-300">
                  GadgetReview
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute -top-1 right-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:w-full transition-all duration-300 delay-100"></span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                {/* Categories dropdown in main header */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 group py-1"
                    onMouseEnter={() => setIsCategoryDropdownOpen(true)}
                    onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  >
                    Sections
                    <ChevronDownIcon className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                  </button>

                  {isCategoryDropdownOpen && (
                    <div
                      className="absolute left-0 mt-3 w-56 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10 transform transition-all duration-200 opacity-100 scale-100 origin-top-left"
                      onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                    >
                      <div className="py-2 px-1">
                        {renderCategories(categories, true)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Amazon-style search bar with improved design */}
            <div className="flex-1 max-w-3xl mx-4 hidden md:block">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative flex-shrink-0" ref={searchCategoryDropdownRef}>
                  <button
                    type="button"
                    className="flex items-center h-10 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-150"
                    onClick={() => setIsSearchCategoryDropdownOpen(!isSearchCategoryDropdownOpen)}
                  >
                    <span className="truncate max-w-[100px]">
                      {searchCategory === 'all' ? 'All Categories' :
                        categories.find(cat => cat.slug === searchCategory)?.name || 'All Categories'}
                    </span>
                    <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </button>

                  {isSearchCategoryDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
                      <div className="py-1">
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => handleSearchCategorySelect('all')}
                        >
                          All Categories
                        </button>
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => handleSearchCategorySelect(category.slug)}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products, brands, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-10 px-4 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-400 transition-all duration-300 text-gray-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 rounded-r-md flex items-center justify-center shadow-md transition-all duration-200 hover:shadow-lg"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </form>
            </div>
            
            {/* Navigation links with improved styling */}
            <div className='hidden md:flex gap-6 mr-5'>
              <Link href="/about" className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 group py-1 font-medium">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/contact" className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 group py-1 font-medium">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            <div className="flex items-center space-x-5">
              {/* Show search icon in main header for mobile */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:scale-110 transition-all duration-200"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" />
                </button>
              </div>

              {/* Theme toggle with improved animation */}
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transform hover:scale-110 transition-all duration-300 ring-1 ring-gray-200 dark:ring-gray-700"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5 text-amber-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-indigo-600" />
                )}
              </button>
              
              {/* Mobile menu button with improved animation */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden transform transition-all duration-300"
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

        {/* Mobile menu with improved styling */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
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
                            {category.subcategories.map((sub: Category) => (
                              <Link
                                key={sub.id}
                                href={`/category/${category.slug}/${sub.slug}`}
                                className="block py-2 text-sm text-gray-500 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile search - Amazon style with improved styling */}
              <div className="px-3 py-2">
                {isSearchExpanded ? (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <select
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        className="py-2 px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.slug}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      <form onSubmit={handleSearch} className="flex flex-1">
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-3 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 rounded-r-md flex items-center justify-center"
                        >
                          <MagnifyingGlassIcon className="h-5 w-5" />
                        </button>
                      </form>
                    </div>
                    <button
                      onClick={() => setIsSearchExpanded(false)}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchExpanded(true)}
                    className="w-full py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                    Search
                  </button>
                )}
              </div>

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
      <div className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-xl transition-all duration-300 ${scrolled ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'} transform border-b border-gray-700`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
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
                  className="w-full py-3 pl-12 pr-12 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-inner transition-all duration-200"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 group">
                  <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 group-hover:text-primary-400 transition-colors duration-200" />
                </button>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 group"
                  onClick={() => setIsSearchExpanded(false)}
                >
                  <XMarkIcon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </button>
              </form>
            </div>
          ) : (
            // Normal view with categories and search icon
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 relative">
                  <div className="py-1 px-3 bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 font-bold rounded-md shadow-md transform hover:scale-105 transition-transform duration-200">
                    Explore
                  </div>
                  <div className="relative group">
                    <div className="h-1 w-full absolute -bottom-2 left-0 bg-gradient-to-r from-transparent via-primary-500 to-transparent scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <div className="flex flex-wrap gap-x-8 gap-y-3 relative">
                      {renderCategories(categories)}
                    </div>
                  </div>
                </div>
              </div>

             
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
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
        <div className="container w-full mx-auto py-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
