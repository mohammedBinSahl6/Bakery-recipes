import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-pink-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <span className="text-lg font-semibold">Bakery Recipes</span>
          </div>
          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:underline">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/create-recipe" className="hover:underline">
                  Create Recipe
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:underline">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-4 text-center text-sm">
          © 2023 Bakery Recipes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
