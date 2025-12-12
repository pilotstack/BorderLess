import Menu from '../ui/menu';
import Footer from '../ui/footer';
import { Card } from '@/components/ui/card';
import { Outlet } from 'react-router';
const layout = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Menu></Menu>
        <Card>
          <Outlet></Outlet>
        </Card>
        <Footer></Footer>
      </div>
    </>
  );
};
export default layout;
