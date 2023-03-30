export interface IHomeLayoutProps {
  children?: React.ReactNode;
  upload?: () => void;
  toggleView?: boolean;
}

export {};

declare global {
  interface Window {
    videojs: any;
  }
}
