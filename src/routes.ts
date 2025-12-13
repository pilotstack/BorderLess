import { createBrowserRouter } from 'react-router';
import App from './App';

import Body from './ui/body';
import AllPassport from './ui/all_passport';
import GlobalPassportRanking from './ui/global_passport_ranking';
import PassportDetail from './ui/passport_detail';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: Body }, // / 主页
      { path: 'all_passport', Component: AllPassport },
      { path: 'rank', Component: GlobalPassportRanking },
      { path: 'passport/:code', Component: PassportDetail }, // 国家详情页
    ],
  },
]);

export default router;
