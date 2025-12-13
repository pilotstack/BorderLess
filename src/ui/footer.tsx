const footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} BorderLess. All rights reserved.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
          Made with passion to explore global mobility
        </p>
      </div>
    </footer>
  );
};

export default footer;
