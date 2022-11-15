import axios from "axios";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { store } from "redux/app/store";

import AccountIcon from "@icons/AccountIcon";
import ChannelIcon from "@icons/ChannelIcon";
import CommunityGuidIcon from "@icons/CommunityGuidIcon";
import ContentIcon from "@icons/ContentIcon";
import CopyRightIcon from "@icons/CopyRightIcon";
import DiscoverIcon from "@icons/DiscoverIcon";
import EditIcon from "@icons/EditIcon";
import FaqIcon from "@icons/FaqIcon";
import HomeIcon from "@icons/HomeIcon";
import LiveEventIcon from "@icons/LiveEventIcon";
import LiveIcon from "@icons/LiveIcon";
import NotificationSetIcon from "@icons/NotificationSetIcon";
import PrivacyPolicyIcon from "@icons/PrivacyPolicyIcon";
import ProfileIcon from "@icons/ProfileIcon";
import SettingsIcon from "@icons/SettingsIcon";
import StreamIcon from "@icons/StreamIcon";
import TermsServiceIcon from "@icons/TermsServiceIcon";
import TrendingIcon from "@icons/TrendingIcon";
import VideoContent from "@icons/VideoContent";
import WalletIcon from "@icons/WalletIcon";

import AnalyticsIcon from "../assets/icons/AnalyticsIcon";
import { MenuData } from "./interface";

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
  { key: "1", name: "Username/Email" },
  { key: "2", name: "Password", image: "/assets/Password-lock.png" },
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
    key: "1",
    name: "Username",
    inputName: "userName",
  },
  {
    key: "2",
    name: "Email",
    inputName: "email",
  },
  {
    key: "3",
    name: "Password",
    image: "/assets/Password-lock.png",
  },

  {
    key: "4",
    name: "Referral Code (Optional)",
    inputName: "referralCode",
  },
];

export const socialMediaIconsData = ["google", "apple", "facebook"];

export const changePasswordInputData: {
  key: string;
  name: string;
  inputName: string;
}[] = [
  {
    key: "1",
    name: "New password",
    inputName: "password",
  },
  {
    key: "2",
    name: "Confirm new password",
    inputName: "confirmPassword",
  },
];

export const cliquePlatformData1: {
  key: string;
  name: string;
  detail: string;
  image: string;
}[] = [
  {
    key: "1",
    name: "Monetization",
    detail:
      "Clique allows users to subscribe to their favourite creators channels. As a creator, you get to earn on your craft, and as a user, you have access to all your creator gives.",
    image: "money",
  },
  {
    key: "2",
    name: "Stream Live",
    detail:
      "Clique allows creators go live from any device and you can also create standard live events for your followers with ticket purchases all on one platform",
    image: "stream",
  },
  {
    key: "3",
    name: "Schedule Streams",
    detail:
      "Your content can go before you, while you focus on making more plans on it. How? You can schedule a live stream and your followers anticipate",
    image: "schedule",
  },
];

export const cliquePlatformData2: {
  key: string;
  name: string;
  detail: string;
  image: string;
}[] = [
  {
    key: "4",
    name: "For all devices",
    detail:
      "What you can do on one, you can do on all. Yes! Clique is on both mobile platforms and the web platform.",
    image: "all-devices",
  },
  {
    key: "5",
    name: "Analytics",
    detail:
      "We won’t leave you half way. Clique also allows you as a creator to analyse and see your progress with money and followers..",
    image: "analytics",
  },
  {
    key: "6",
    name: "Upload & Organize",
    detail:
      "Clique has a very smooth and easy platfom for creator to create, upload and for users to follow and keep track. This platform is the best thing after sliced bread.",
    image: "upload",
  },
];

export const walletData: {
  key: string;
  time: string;
  image: string;
  amount: string;
}[] = [
  {
    key: "1",
    time: "8 hour",
    amount: "₦20,000.00",
    image: "arrow-up",
  },
  {
    key: "2",
    time: "1 hour",
    amount: "₦83,200.00'",
    image: "arrow-up",
  },
  {
    key: "3",
    time: "4 hour",
    amount: "₦8,100.00",
    image: "arrow-down",
  },
];

export const helpGrowData: {
  key: string;
  header: string;
  image: string;
  bigImage: string;
}[] = [
  {
    key: "1",
    header: "Increase your earning",
    image: "microphone",
    bigImage: "big-microphone",
  },
  {
    key: "2",
    header: "Optimized for growth",
    image: "movie-action",
    bigImage: "big-movie-action",
  },
];

export const famousCreatorsImageData: string[] = [
  "celeb1",
  "celeb2",
  "celeb3",
  "celeb4",
  "celeb5",
  "celeb6",
  "celeb7",
  "celeb8",
];

export const contactInfoData: {
  image: string;
  detail: string;
}[] = [
  {
    image: "location",
    detail: "2715 Ash Dr. San Jose, Ikoyi Link Bridge 83475",
  },
  {
    image: "call",
    detail: "(234) 81 5678 2341",
  },
  {
    image: "message",
    detail: "info@clique.co",
  },
];

export const footerOthersData: {
  key: string;
  detail: string;
}[] = [
  {
    key: "1",
    detail: "FAQs",
  },
  {
    key: "2",
    detail: "Privacy Policy",
  },
  {
    key: "3",
    detail: "Terms and Conditions",
  },
];

export const sideBarData: {
  key: string;
  detail: string;
}[] = [
  {
    key: "0",
    detail: "About",
  },
  {
    key: "1",
    detail: "FAQs",
  },
  {
    key: "2",
    detail: "Privacy Policy",
  },
  {
    key: "3",
    detail: "Terms and Conditions",
  },
];

export const menu: {
  name: string;
  icon: any;
}[] = [
  {
    name: "home",
    icon: HomeIcon,
  },
  {
    name: "discover",
    icon: DiscoverIcon,
  },
  {
    name: "trending",
    icon: TrendingIcon,
  },
  {
    name: "profile",
    icon: ProfileIcon,
  },
  {
    name: "wallet",
    icon: WalletIcon,
  },
  {
    name: "Live Events",
    icon: LiveIcon,
  },

  {
    name: "Your channel",
    icon: ChannelIcon,
  },
  {
    name: "settings",
    icon: SettingsIcon,
  },
];

export const menuWithOutLive: {
  name: string;
  icon: any;
}[] = [
  {
    name: "home",
    icon: HomeIcon,
  },
  {
    name: "discover",
    icon: DiscoverIcon,
  },
  {
    name: "trending",
    icon: TrendingIcon,
  },
  {
    name: "profile",
    icon: ProfileIcon,
  },
  {
    name: "wallet",
    icon: WalletIcon,
  },
  {
    name: "Live Events",
    icon: LiveIcon,
  },
  {
    name: "settings",
    icon: SettingsIcon,
  },
];

export const subcribees: {
  name: string;
  imgUrl: string;
}[] = [
  {
    name: "burnaboy",
    imgUrl: "https://bit.ly/prosper-baba",
  },
  {
    name: "burnaboy",
    imgUrl: "https://bit.ly/prosper-baba",
  },
];

export const videoDetails = [
  {
    title: "Title",
    input: true,
  },
  {
    title: "Description",
    input: false,
  },
];

export const selectArr = [
  {
    placeholder: "Choose Category",
    options: ["Option"],
  },
  {
    placeholder: "Age Range",
    options: ["Option"],
  },
  {
    placeholder: "Visibility",
    options: ["Option"],
  },
];

export const profileMenu: {
  name: string;
  route: string;
  icon: any;
}[] = [
  {
    name: "Content",
    route: "content",
    icon: ContentIcon,
  },
  {
    name: "Edit Profile Details",
    route: "edit",
    icon: DiscoverIcon,
  },
];

export const profileNav: {
  title: string;
  name: string;
}[] = [
  { title: "Paid Live", name: "paid" },
  { title: "Playlists", name: "play" },
  { title: "Saved Videos", name: "saved" },
];

export const playListData = [
  {
    bigImage: "tiger",
    noOfVideos: "43",
    smallImage: "uploader",
    name: "NAT GEO COMPILATIONS",
  },
  {
    bigImage: "flower",
    noOfVideos: "76",
    smallImage: "flowersmall",
    name: "Plant Cultivation Practices",
  },
  {
    bigImage: "food",
    noOfVideos: "6",
    smallImage: "foodsmall",
    name: "Food Network",
  },
  {
    bigImage: "ayarmix",
    noOfVideos: "25",
    smallImage: "ayarstar",
    name: "Ayra Star Mix",
  },
];
export const baseUrl: string = "https://clique-backend-dev.onrender.com/";
// export const baseUrl: string = 'http://localhost:4000/';

export const scrollBarStyle = {
  "&::-webkit-scrollbar": {
    width: "8px",
    rounded: "full",
  },
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
  },
  "&::-webkit-scrollbar-thumb": {
    bg: "clique.primaryBg",
    outline: "none",
  },
};

export const purpleBoxStyle = {
  content: '""',
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  bg: "clique.base",
  left: 0,
  width: "6px",
  height: "25px",
  borderRightRadius: "4px",
};

export const editInputData = [
  { name: "First name", sideContent: "Edit" },
  { name: "Last name", sideContent: "Edit" },
  {
    name: "Username",
    sideContent: "(Username can only be changed 2 times a year)",
  },
  { name: "Email", sideContent: "Edit" },
  { name: "Password", sideContent: "Edit" },
  { name: "Date of Birth", sideContent: "Edit" },
];

export const subscriptionsData = [
  { name: "Kint Klarton Brown", status: "active" },
  { name: "Naomi Cambel", status: "active" },
  { name: "Black Lives Matter", status: "active" },
  { name: "Sarah Banks", status: "notActive" },
  { name: "Jennifer Ugochi", status: "active" },
  { name: "Lanre Kolade", status: "active" },
  { name: "Chiamaka Okoye", status: "notActive" },
  { name: "Mirabelle Odes", status: "notActive" },
  { name: "Chimamanda Nneka", status: "active" },
  { name: "Isioma Violet", status: "active" },
  { name: "Dara Omolara", status: "active" },
];

export const settingsMenu = [
  {
    name: "Account",
    route: "account",
    icon: AccountIcon,
  },
  {
    name: "Notification Settings",
    route: "notification",
    icon: NotificationSetIcon,
  },
  {
    name: "Copyright Policy",
    route: "copyright",
    icon: CopyRightIcon,
  },
  {
    name: "Terms Of Services",
    route: "terms",
    icon: TermsServiceIcon,
  },
  {
    name: "Community Guidelines",
    route: "guidlines",
    icon: CommunityGuidIcon,
  },
  {
    name: "Privacy Policy",
    route: "privacy",
    icon: PrivacyPolicyIcon,
  },
  {
    name: "FAQs",
    route: "faqs",
    icon: FaqIcon,
  },
];

export const goliveMenu = [
  {
    name: "Stream",
    route: "stream",
    icon: StreamIcon,
  },
  {
    name: "Live event",
    route: "liveevent",
    icon: LiveEventIcon,
  },
];

export const channelMenu: MenuData[] = [
  {
    name: "Content",
    route: "content",
    icon: ContentIcon,
  },
  {
    name: "Edit Channel Details",
    route: "edit",
    icon: DiscoverIcon,
  },
  {
    name: "Channel Analytics",
    route: "analytics",
    icon: AnalyticsIcon,
  },
];

export const createChannelMenu = [
  {
    name: "Create Channel",
    route: "channel",
    icon: VideoContent,
  },
];

export const channelNav: {
  title: string;
  name: string;
}[] = [
  { title: "Uploads", name: "upload" },
  { title: "Live Recordings", name: "live" },
  { title: "Playlists", name: "playlist" },
];

export const shareData: string[] = [
  "whatsapp",
  "ig",
  "tikTok",
  "figma",
  "github",
  "twitter",
];

export const chartData: {
  name: string;
  amount: string;
  detail: string;
  increase: boolean;
}[] = [
  {
    name: "Subscribers",
    amount: "13,241",
    detail: "Daily subscribers insight",
    increase: false,
  },
  {
    name: "Visitor",
    amount: "9,334",
    detail: "Daily Visitors insight",
    increase: true,
  },
  {
    name: "Returning Visitor",
    amount: "4,107",
    detail: "Daily Returning Visitors insight",
    increase: true,
  },
];

export const analyticsData: {
  text1: string;
  text2: string;
}[] = [
  {
    text1: "Total Number of Likes",
    text2: "21,678,009",
  },
  {
    text1: "Total Number of Shares",
    text2: "638,935",
  },
  {
    text1: "Total Number of Live Stream Views",
    text2: "1,975,935",
  },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = ["January", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: [0, 400],
      borderColor: "rgb(137, 44, 220)",
      backgroundColor: "rgba(137, 44, 220, 0.5)",
    },
  ],
};

export const age: string[] = ["18 and above", "Below 18"];

export const API = axios.create({ baseURL: baseUrl });

API.interceptors.request.use((req) => {
  if (store.getState().app.userReducer.token) {
    if (req.headers) {
      req.headers.Authorization = `Bearer ${
        store.getState().app.userReducer.token
      }`;
    }
  }
  return req;
});

export interface contentData {
  _id: string;
  dislikesCount: number;
  likesCount: number;
  thumbNail: string;
  video: string;
  uploader_id: uploaderId;
  title: string;
  description: string;
  view: number;
  createdAt: any;
  category_id: string;
}

export interface uploaderId {
  subscribersCount: number;
  subscribers: string[];
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
}

export default interface commentInterface {
  _id: string;
  commenterId: {
    firstName: string;
    lastName: string;
  };
  comment: {
    comment: string;
    likes: string[];
    dislikes: string[];
  };
  createdAt: string;
}
