export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <p className="text-center text-xs leading-5 text-gray-300">
          &copy; {new Date().getFullYear()} ArtHive, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
