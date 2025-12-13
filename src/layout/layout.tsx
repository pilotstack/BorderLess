import Menu from '../ui/menu';
import Footer from '../ui/footer';
import { Card } from '@/components/ui/card';
import { Outlet } from 'react-router';

const layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Menu />
      <main className="flex-1">
        <Card className="m-0 rounded-none">
          <Outlet />
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default layout;
