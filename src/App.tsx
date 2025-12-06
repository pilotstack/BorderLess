import Layout from './layout/layout';
import { ThemeProvider } from './lib/theme-context';
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout></Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
