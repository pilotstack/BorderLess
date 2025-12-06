import Menu from '../ui/menu';
import Body from '../ui/body';
import Footer from '../ui/footer';

function Home() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Menu></Menu>
        <Body></Body>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Home;
