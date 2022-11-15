export interface IHomeLayoutProps {
  children?: React.ReactNode;
  upload?: () => void;
  toggleView?: boolean;
  search?: string;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
}
