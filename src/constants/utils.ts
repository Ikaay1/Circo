import axios from 'axios';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import CryptoJS from 'crypto-js';
import {store} from 'redux/app/store';

import AccountIcon from '@icons/AccountIcon';
import ChannelIcon from '@icons/ChannelIcon';
import CommunityGuidIcon from '@icons/CommunityGuidIcon';
import ContentIcon from '@icons/ContentIcon';
import CopyRightIcon from '@icons/CopyRightIcon';
import DiscoverIcon from '@icons/DiscoverIcon';
import EditIcon from '@icons/EditIcon';
import FaqIcon from '@icons/FaqIcon';
import HomeIcon from '@icons/HomeIcon';
import LiveEventIcon from '@icons/LiveEventIcon';
import LiveIcon from '@icons/LiveIcon';
import NotificationSetIcon from '@icons/NotificationSetIcon';
import PrivacyPolicyIcon from '@icons/PrivacyPolicyIcon';
import ProfileIcon from '@icons/ProfileIcon';
import SettingsIcon from '@icons/SettingsIcon';
import StreamIcon from '@icons/StreamIcon';
import TermsServiceIcon from '@icons/TermsServiceIcon';
import TrendingIcon from '@icons/TrendingIcon';
import VideoContent from '@icons/VideoContent';
import WalletIcon from '@icons/WalletIcon';

import AnalyticsIcon from '../assets/icons/AnalyticsIcon';
import {MenuData} from './interface';

export const loginInputData: (
  | {
      key: string;
      name: string;
      image?: undefined;
    }
  | {
      key: string;
      name: string;
      image: string;
    }
)[] = [
  {key: '1', name: 'Username/Email'},
  {key: '2', name: 'Password', image: '/assets/Password-lock.png'},
];

export const signUpInputData: (
  | {
      key: string;
      name: string;
      inputName: string;
      image?: undefined;
    }
  | {
      key: string;
      name: string;
      image: string;
      inputName?: undefined;
    }
)[] = [
  {
    key: '1',
    name: 'Username',
    inputName: 'userName',
  },
  {
    key: '2',
    name: 'Email',
    inputName: 'email',
  },
  {
    key: '3',
    name: 'Password',
    image: '/assets/Password-lock.png',
  },

  {
    key: '4',
    name: 'Referral Code (Optional)',
    inputName: 'referralCode',
  },
];

export const socialMediaIconsData = ['google', 'apple', 'facebook'];

export const changePasswordInputData: {
  key: string;
  name: string;
  inputName: string;
}[] = [
  {
    key: '1',
    name: 'New password',
    inputName: 'password',
  },
  {
    key: '2',
    name: 'Confirm new password',
    inputName: 'confirmPassword',
  },
];

export const cliquePlatformData1: {
  key: string;
  name: string;
  detail: string;
  image: string;
}[] = [
  {
    key: '1',
    name: 'Monetization',
    detail:
      'Circo allows users to subscribe to their favourite creators channels. As a creator, you get to earn on your craft, and as a user, you have access to all your creator gives.',
    image: 'money',
  },
  {
    key: '2',
    name: 'Stream Live',
    detail:
      'Circo allows creators go live from any device and you can also create standard live events for your followers with ticket purchases all on one platform',
    image: 'stream',
  },
  {
    key: '3',
    name: 'Schedule Streams',
    detail:
      'Your content can go before you, while you focus on making more plans on it. How? You can schedule a live stream and your followers anticipate',
    image: 'schedule',
  },
];

export const cliquePlatformData2: {
  key: string;
  name: string;
  detail: string;
  image: string;
}[] = [
  {
    key: '4',
    name: 'For all devices',
    detail:
      'What you can do on one, you can do on all. Yes! Circo is on both mobile platforms and the web platform.',
    image: 'all-devices',
  },
  {
    key: '5',
    name: 'Analytics',
    detail:
      'We won’t leave you half way. Circo also allows you as a creator to analyse and see your progress with money and followers..',
    image: 'analytics',
  },
  {
    key: '6',
    name: 'Upload & Organize',
    detail:
      'Circo has a very smooth and easy platfom for creator to create, upload and for users to follow and keep track. This platform is the best thing after sliced bread.',
    image: 'upload',
  },
];

export const walletData: {
  key: string;
  time: string;
  image: string;
  amount: string;
}[] = [
  {
    key: '1',
    time: '8 hour',
    amount: '₦20,000.00',
    image: 'arrow-up',
  },
  {
    key: '2',
    time: '1 hour',
    amount: "₦83,200.00'",
    image: 'arrow-up',
  },
  {
    key: '3',
    time: '4 hour',
    amount: '₦8,100.00',
    image: 'arrow-down',
  },
];

export const helpGrowData: {
  key: string;
  header: string;
  image: string;
  bigImage: string;
  text?: string;
}[] = [
  {
    key: '1',
    header: 'Increase your earning',
    image: 'microphone',
    bigImage: 'big-microphone',
    text: 'Your content is your craft and we know this. Hence, we have created this platform to help you monetize your craft. With each subscriber paying you, and tickets selling for each of your live events, your earnings will surely increase!',
  },
  {
    key: '2',
    header: 'Optimized for growth',
    image: 'movie-action',
    bigImage: 'big-movie-action',
    text: 'The CIRCO ecosystem is designed to help you generate profit. Set up complete sales and marketing funnels with ease using the CIRCO built-in marketing tools and integrations. Our goal is to help you focus on creating mind blowing contents, while we take care of the maintenance, analytics, and more.',
  },
];

export const famousCreatorsImageData: string[] = [
  'celeb1',
  'celeb2',
  'celeb3',
  'celeb4',
  'celeb5',
  'celeb6',
  'celeb7',
  'celeb8',
];

export const contactInfoData: {
  image: string;
  detail: string;
}[] = [
  {
    image: 'location',
    detail: 'Admiralty Road 23, Lekki Phase 1, Lagos, Nigeria.',
  },
  // {
  //   image: 'call',
  //   detail: '(234) 81 5678 2341',
  // },
  {
    image: 'message',
    detail: 'admin@circo.africa',
  },
];

export const footerOthersData: {
  key: string;
  detail: string;
  link: string;
}[] = [
  // {
  //   key: '1',
  //   detail: 'FAQs',
  // },
  {
    key: '2',
    detail: 'Privacy Policy',
    link: '/privacy-policy',
  },
  {
    key: '3',
    detail: 'Terms of Service',
    link: '/terms-of-service',
  },
];

export const sideBarData: {
  key: string;
  detail: string;
  link: string;
}[] = [
  {
    key: '2',
    detail: 'Privacy Policy',
    link: '/privacy-policy',
  },
  {
    key: '3',
    detail: 'Terms of Service',
    link: '/terms-of-service',
  },
];

export const menu: {
  name: string;
  icon: any;
}[] = [
  {
    name: 'home',
    icon: HomeIcon,
  },
  {
    name: 'discover',
    icon: DiscoverIcon,
  },
  {
    name: 'trending',
    icon: TrendingIcon,
  },
  {
    name: 'profile',
    icon: ProfileIcon,
  },
  {
    name: 'wallet',
    icon: WalletIcon,
  },
  {
    name: 'Live Events',
    icon: LiveIcon,
  },

  {
    name: 'Your channel',
    icon: ChannelIcon,
  },
  {
    name: 'settings',
    icon: SettingsIcon,
  },
];

export const mobileMenu: {
  name: string;
  icon: any;
  type: string;
  route?: string;
  subMenu?: {
    name: string;
    icon: any;
    route: string;
  }[];
}[] = [
  {
    name: 'home',
    icon: HomeIcon,
    type: 'menu',
    route: 'home',
  },
  {
    name: 'discover',
    icon: DiscoverIcon,
    type: 'menu',
    route: 'discover',
  },
  {
    name: 'trending',
    icon: TrendingIcon,
    type: 'menu',
    route: 'trending',
  },
  {
    name: 'profile',
    icon: ProfileIcon,
    type: 'subMenu',
    route: 'profile',
    subMenu: [
      {
        name: 'Content',
        route: 'content',
        icon: ContentIcon,
      },
      {
        name: 'Edit Profile Details',
        route: 'edit',
        icon: DiscoverIcon,
      },
    ],
  },
  {
    name: 'wallet',
    icon: WalletIcon,
    type: 'menu',
    route: 'wallet',
  },
  {
    name: 'Live Events',
    icon: LiveIcon,
    type: 'menu',
    route: 'liveevents',
  },

  {
    name: 'Your channel',
    route: 'myChannel',
    icon: ChannelIcon,
    type: 'subMenu',
    subMenu: [
      {
        name: 'Content',
        route: 'content',
        icon: ContentIcon,
      },
      {
        name: 'Edit Channel Details',
        route: 'edit',
        icon: DiscoverIcon,
      },
      {
        name: 'Channel Analytics',
        route: 'analytics',
        icon: AnalyticsIcon,
      },
    ],
  },
  {
    name: 'settings',
    icon: SettingsIcon,
    type: 'menu',
    route: 'settings',
  },
];
export const menuWithOutLive: {
  name: string;
  icon: any;
}[] = [
  {
    name: 'home',
    icon: HomeIcon,
  },
  {
    name: 'discover',
    icon: DiscoverIcon,
  },
  {
    name: 'trending',
    icon: TrendingIcon,
  },
  {
    name: 'profile',
    icon: ProfileIcon,
  },
  {
    name: 'wallet',
    icon: WalletIcon,
  },
  {
    name: 'Live Events',
    icon: LiveIcon,
  },
  {
    name: 'settings',
    icon: SettingsIcon,
  },
];

export const subcribees: {
  name: string;
  imgUrl: string;
}[] = [
  {
    name: 'burnaboy',
    imgUrl: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'burnaboy',
    imgUrl: 'https://bit.ly/prosper-baba',
  },
];

export const videoDetails = [
  {
    title: 'Title',
    input: true,
  },
  {
    title: 'Description',
    input: false,
  },
];

export const selectArr = [
  {
    placeholder: 'Choose Category',
    options: ['Option'],
  },
  {
    placeholder: 'Age Range',
    options: ['Option'],
  },
];

export const profileMenu: {
  name: string;
  route: string;
  icon: any;
}[] = [
  {
    name: 'Content',
    route: 'content',
    icon: ContentIcon,
  },
  {
    name: 'Edit Profile Details',
    route: 'edit',
    icon: DiscoverIcon,
  },
];

export const profileNav: {
  title: string;
  name: string;
}[] = [
  {title: 'Paid Live', name: 'paid'},
  {title: 'Playlists', name: 'play'},
  {title: 'Saved Videos', name: 'saved'},
];

export const playListData = [
  {
    bigImage: 'tiger',
    noOfVideos: '43',
    smallImage: 'uploader',
    name: 'NAT GEO COMPILATIONS',
  },
  {
    bigImage: 'flower',
    noOfVideos: '76',
    smallImage: 'flowersmall',
    name: 'Plant Cultivation Practices',
  },
  {
    bigImage: 'food',
    noOfVideos: '6',
    smallImage: 'foodsmall',
    name: 'Food Network',
  },
  {
    bigImage: 'ayarmix',
    noOfVideos: '25',
    smallImage: 'ayarstar',
    name: 'Ayra Star Mix',
  },
];

export const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export const scrollBarStyle = {
  '&::-webkit-scrollbar': {
    width: '8px',
    rounded: 'full',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    bg: 'clique.base',
    outline: 'none',
  },
};

export const scrollBarStyle2 = {
  '&::-webkit-scrollbar': {
    width: '10px',
    // rounded: 'full',
    // height: '20px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    bg: 'clique.base',
    outline: 'none',
    borderRadius: '20px',
    background: 'clique.base',
    backgroundClip: 'content-box',
    borderTop: '10px solid transparent',
  },
};

export const scrollBarStyle4 = {
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '12px',
    // rounded: 'full',
    // height: '20px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    bg: 'clique.base',
    outline: 'none',
    borderRadius: '20px',
    background: 'clique.base',
    backgroundClip: 'content-box',
    borderTop: '10px solid transparent',
  },
};

export const scrollBarStyle3 = {
  '&::-webkit-scrollbar': {
    width: '5px',
    // rounded: 'full',
    // height: '20px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    bg: 'clique.base',
    outline: 'none',
    borderRadius: '20px',
    background: 'clique.base',
    backgroundClip: 'content-box',
  },
};

export const purpleBoxStyle = {
  content: '""',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  bg: 'clique.base',
  left: 0,
  width: '6px',
  height: '25px',
  borderRightRadius: '4px',
};

export const editInputData = [
  {name: 'First name', sideContent: 'Edit'},
  {name: 'Last name', sideContent: 'Edit'},
  {
    name: 'Username',
    sideContent: '(Username can only be changed 2 times a year)',
  },
  {name: 'Email', sideContent: 'Edit'},
  {name: 'Password', sideContent: 'Edit'},
  {name: 'Date of Birth', sideContent: 'Edit'},
];

export const subscriptionsData = [
  {name: 'Kint Klarton Brown', status: 'active'},
  {name: 'Naomi Cambel', status: 'active'},
  {name: 'Black Lives Matter', status: 'active'},
  {name: 'Sarah Banks', status: 'notActive'},
  {name: 'Jennifer Ugochi', status: 'active'},
  {name: 'Lanre Kolade', status: 'active'},
  {name: 'Chiamaka Okoye', status: 'notActive'},
  {name: 'Mirabelle Odes', status: 'notActive'},
  {name: 'Chimamanda Nneka', status: 'active'},
  {name: 'Isioma Violet', status: 'active'},
  {name: 'Dara Omolara', status: 'active'},
];

export const settingsMenu = [
  {
    name: 'Account',
    route: 'account',
    icon: AccountIcon,
  },
  {
    name: 'Notification Settings',
    route: 'notification',
    icon: NotificationSetIcon,
  },
  // {
  //   name: 'Copyright Policy',
  //   route: 'copyright',
  //   icon: CopyRightIcon,
  // },
  {
    name: 'Terms Of Service',
    route: 'terms',
    icon: TermsServiceIcon,
  },
  // {
  //   name: 'Community Guidelines',
  //   route: 'guidlines',
  //   icon: CommunityGuidIcon,
  // },
  {
    name: 'Privacy Policy',
    route: 'privacy',
    icon: PrivacyPolicyIcon,
  },
  {
    name: 'Help and Support',
    route: 'faqs',
    icon: FaqIcon,
  },
];

export const goliveMenu = [
  {
    name: 'Stream Now',
    route: 'stream',
    icon: StreamIcon,
  },
  {
    name: 'Schedule Stream',
    route: 'liveevent',
    icon: LiveEventIcon,
  },
];

export const channelMenu: MenuData[] = [
  {
    name: 'Content',
    route: 'content',
    icon: ContentIcon,
  },
  {
    name: 'Edit Channel Details',
    route: 'edit',
    icon: DiscoverIcon,
  },
  {
    name: 'Channel Analytics',
    route: 'analytics',
    icon: AnalyticsIcon,
  },
];

export const createChannelMenu = [
  {
    name: 'Create Channel',
    route: 'channel',
    icon: VideoContent,
  },
];

export const channelNav: {
  title: string;
  name: string;
}[] = [
  {title: 'Uploads', name: 'upload'},
  {title: 'Live Recordings', name: 'live'},
  {title: 'Playlists', name: 'playlist'},
];

export const shareData: string[] = ['whatsapp', 'ig', 'twitter', 'facebook'];

export const chartData: {
  name: string;
  amount: string;
  detail: string;
  increase: boolean;
}[] = [
  {
    name: 'Subscribers',
    amount: '13,241',
    detail: 'Daily subscribers insight',
    increase: false,
  },
  {
    name: 'Visitor',
    amount: '9,334',
    detail: 'Daily Visitors insight',
    increase: true,
  },
  {
    name: 'Returning Visitor',
    amount: '4,107',
    detail: 'Daily Returning Visitors insight',
    increase: true,
  },
];

export const analyticsData: {
  text1: string;
  text2: string;
}[] = [
  {
    text1: 'Total Number of Likes',
    text2: '21,678,009',
  },
  // {
  //   text1: "Total Number of Shares",
  //   text2: "638,935",
  // },
  {
    text1: 'Total Number of Live Stream Views',
    text2: '1,975,935',
  },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        color: '#A1A1A1',
      },
    },
    y: {
      grid: {
        color: '#A1A1A1',
      },
    },
  },
};

const labels = ['July 31', 'Aug 29', 'Sep 29', 'Oct 29', 'Nov 17'];

export const data = {
  labels,
  datasets: [
    {
      label: '',
      data: [10, 20, 50, 70, 80],
      borderColor: 'rgb(137, 44, 220)',
      backgroundColor: '#E6E6E6',
    },
  ],
};

export const age: string[] = ['18 and above', 'Below 18', 'ALL'];

export const API = axios.create({baseURL: baseUrl});

API.interceptors.request.use((req) => {
  if (store.getState().app.userReducer.token) {
    if (req.headers) {
      // req.headers.Authorization = `Bearer ${
      //   store.getState().app.userReducer.token
      // }`;
    }
  }
  return req;
});
export interface contentData {
  _id: string;
  dislikesCount: number;
  likesCount: number;
  duration: number;
  thumbNail: string;
  video: string;
  uploader_id: uploaderId;
  title: string;
  description: string;
  view: number;
  createdAt: any;
  updatedAt: any;
  category_id: string;
  uploader_userName: string;
  channel_id?: any;
  isFree: boolean;
  uploadTime?: string;
}

export interface uploaderId {
  subscribersCount: number;
  subscribers: string[];
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  photo?: string;
}

export default interface replyInterface {
  _id: string;
  reply: string;
  replierId: {
    photo: string;
    firstName: string;
    lastName: string;
    _id: string;
    channel_id: {
      name: string;
      photo: string;
    };
  };
  likes: string[];
  dislikes: string[];
  countReplyLikes: number;
  countReplyDislikes: number;
  createdAt: string;
}

export default interface commentInterface {
  _id: string;
  commenterId: {
    photo: string;
    firstName: string;
    lastName: string;
    _id: string;
    channel_id: {
      name: string;
      photo: string;
    };
  };
  comment: {
    comment: string;
    likes: string[];
    dislikes: string[];
  };
  createdAt: string;
  replies: replyInterface[];
}

export const banks = [
  {
    id: 132,
    code: '560',
    name: 'Page MFBank',
  },
  {
    id: 133,
    code: '304',
    name: 'Stanbic Mobile Money',
  },
  {
    id: 134,
    code: '308',
    name: 'FortisMobile',
  },
  {
    id: 135,
    code: '328',
    name: 'TagPay',
  },
  {
    id: 136,
    code: '309',
    name: 'FBNMobile',
  },
  {
    id: 137,
    code: '011',
    name: 'First Bank of Nigeria',
  },
  {
    id: 138,
    code: '326',
    name: 'Sterling Mobile',
  },
  {
    id: 139,
    code: '990',
    name: 'Omoluabi Mortgage Bank',
  },
  {
    id: 140,
    code: '311',
    name: 'ReadyCash (Parkway)',
  },
  {
    id: 141,
    code: '057',
    name: 'Zenith Bank',
  },
  {
    id: 142,
    code: '068',
    name: 'Standard Chartered Bank',
  },
  {
    id: 143,
    code: '306',
    name: 'eTranzact',
  },
  {
    id: 144,
    code: '070',
    name: 'Fidelity Bank',
  },
  {
    id: 145,
    code: '023',
    name: 'CitiBank',
  },
  {
    id: 146,
    code: '215',
    name: 'Unity Bank',
  },
  {
    id: 147,
    code: '323',
    name: 'Access Money',
  },
  {
    id: 148,
    code: '302',
    name: 'Eartholeum',
  },
  {
    id: 149,
    code: '324',
    name: 'Hedonmark',
  },
  {
    id: 150,
    code: '325',
    name: 'MoneyBox',
  },
  {
    id: 151,
    code: '301',
    name: 'JAIZ Bank',
  },
  {
    id: 152,
    code: '050',
    name: 'Ecobank Plc',
  },
  {
    id: 153,
    code: '307',
    name: 'EcoMobile',
  },
  {
    id: 154,
    code: '318',
    name: 'Fidelity Mobile',
  },
  {
    id: 155,
    code: '319',
    name: 'TeasyMobile',
  },
  {
    id: 156,
    code: '999',
    name: 'NIP Virtual Bank',
  },
  {
    id: 157,
    code: '320',
    name: 'VTNetworks',
  },
  {
    id: 158,
    code: '221',
    name: 'Stanbic IBTC Bank',
  },
  {
    id: 159,
    code: '501',
    name: 'Fortis Microfinance Bank',
  },
  {
    id: 160,
    code: '329',
    name: 'PayAttitude Online',
  },
  {
    id: 161,
    code: '322',
    name: 'ZenithMobile',
  },
  {
    id: 162,
    code: '303',
    name: 'ChamsMobile',
  },
  {
    id: 163,
    code: '403',
    name: 'SafeTrust Mortgage Bank',
  },
  {
    id: 164,
    code: '551',
    name: 'Covenant Microfinance Bank',
  },
  {
    id: 165,
    code: '415',
    name: 'Imperial Homes Mortgage Bank',
  },
  {
    id: 166,
    code: '552',
    name: 'NPF MicroFinance Bank',
  },
  {
    id: 167,
    code: '526',
    name: 'Parralex',
  },
  {
    id: 168,
    code: '035',
    name: 'Wema Bank',
  },
  {
    id: 169,
    code: '084',
    name: 'Enterprise Bank',
  },
  {
    id: 170,
    code: '063',
    name: 'Diamond Bank',
  },
  {
    id: 171,
    code: '305',
    name: 'Paycom',
  },
  {
    id: 172,
    code: '100',
    name: 'SunTrust Bank',
  },
  {
    id: 173,
    code: '317',
    name: 'Cellulant',
  },
  {
    id: 174,
    code: '401',
    name: 'ASO Savings and & Loans',
  },
  {
    id: 175,
    code: '030',
    name: 'Heritage',
  },
  {
    id: 176,
    code: '402',
    name: 'Jubilee Life Mortgage Bank',
  },
  {
    id: 177,
    code: '058',
    name: 'GTBank Plc',
  },
  {
    id: 178,
    code: '032',
    name: 'Union Bank',
  },
  {
    id: 179,
    code: '232',
    name: 'Sterling Bank',
  },
  {
    id: 180,
    code: '076',
    name: 'Polaris Bank',
  },
  {
    id: 181,
    code: '082',
    name: 'Keystone Bank',
  },
  {
    id: 182,
    code: '327',
    name: 'Pagatech',
  },
  {
    id: 183,
    code: '559',
    name: 'Coronation Merchant Bank',
  },
  {
    id: 184,
    code: '601',
    name: 'FSDH',
  },
  {
    id: 185,
    code: '313',
    name: 'Mkudi',
  },
  {
    id: 186,
    code: '214',
    name: 'First City Monument Bank',
  },
  {
    id: 187,
    code: '314',
    name: 'FET',
  },
  {
    id: 188,
    code: '523',
    name: 'Trustbond',
  },
  {
    id: 189,
    code: '315',
    name: 'GTMobile',
  },
  {
    id: 190,
    code: '033',
    name: 'United Bank for Africa',
  },
  {
    id: 191,
    code: '044',
    name: 'Access Bank',
  },
  {
    id: 567,
    code: '90115',
    name: 'TCF MFB',
  },
  {
    id: 1413,
    code: '090175',
    name: 'Test bank',
  },
  {
    id: 1731,
    code: '103',
    name: 'Globus Bank',
  },
];

export function createObjectURL(object: any) {
  return window.URL
    ? window.URL.createObjectURL(object)
    : window.webkitURL.createObjectURL(object);
}

export const decrypt = (video: string) => {
  let decryptedBytes = CryptoJS.AES.decrypt(
    video,
    process.env.NEXT_PUBLIC_SECRET!,
    // 'clique_circo_secret_key'
  );
  return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
};
