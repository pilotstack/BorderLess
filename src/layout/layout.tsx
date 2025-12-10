import Menu from '../ui/menu';
import Body from '../ui/body';
import Footer from '../ui/footer';
import PassPortDetail from '../ui/passport_detail';
import AllPassport from '../ui/all_passport';
import GlobalPassportRanking from '../ui/global_passport_ranking';
import { Card } from '@/components/ui/card';
const layout = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Menu></Menu>
        <Card>
          {/* <AllPassport></AllPassport> */}
          {/* <PassPortDetail></PassPortDetail> */}
          <GlobalPassportRanking></GlobalPassportRanking>
          {/* <Body></Body> */}
        </Card>

        <Footer></Footer>
      </div>
    </>
  );
};
export default layout;
