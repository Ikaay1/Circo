import ChannelIcon from "@icons/ChannelIcon";
import DiscoverIcon from "@icons/DiscoverIcon";
import HomeIcon from "@icons/HomeIcon";
import LiveIcon from "@icons/LiveIcon";
import ProfileIcon from "@icons/ProfileIcon";
import SettingsIcon from "@icons/SettingsIcon";
import TrendingIcon from "@icons/TrendingIcon";
import WalletIcon from "@icons/WalletIcon";

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
      placeholder: string;
      inputName: string;
      image?: undefined;
    }
  | {
      key: string;
      name: string;
      placeholder: string;
      image: string;
      inputName?: undefined;
    }
)[] = [
  { key: "1", name: "First name", placeholder: "Tony", inputName: "firstName" },
  { key: "2", name: "Last name", placeholder: "Clark", inputName: "lastName" },
  {
    key: "3",
    name: "Username",
    placeholder: "@kngjames",
    inputName: "userName",
  },
  {
    key: "4",
    name: "Email",
    placeholder: "tonyclark24@gmail.com",
    inputName: "email",
  },
  {
    key: "5",
    name: "Password",
    placeholder: "Tony1234",
    image: "/assets/Password-lock.png",
  },
];

export const controlInput = (
  num1: number,
  num2: number,
  isActive: boolean,
  texts: NodeListOf<HTMLParagraphElement>
) => {
  if (!isActive) {
    texts[num1].classList.add("inactive");
    texts[num2].classList.add("inactive");
  } else {
    texts[num1].classList.remove("inactive");
    texts[num2].classList.remove("inactive");
  }
};

export const socialMediaIconsData = ["google", "apple", "facebook"];

export const changePasswordInputData: {
  key: string;
  name: string;
  placeholder: string;
  inputName: string;
}[] = [
  {
    key: "1",
    name: "New password",
    placeholder: "************************",
    inputName: "password",
  },
  {
    key: "2",
    name: "Confirm new password",
    placeholder: "ChelseaChampions2021UCL!",
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

export const baseUrl: string = "https://clique-backend-dev.onrender.com/";
