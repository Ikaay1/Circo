import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from 'redux/app/hooks';

export const useRoutingChannel = () => {
  const {userProfile} = useAppSelector((store) => store.app.userReducer);
  const router = useRouter();

  const handleRouting = (id: string) => {
    if (
      router.query.name === 'content' ||
      router.pathname.includes('subscribe')
    ) {
      return;
    }
    if (id === userProfile?._id) {
      router.push('/channel/1/content');
      return;
    }
    router.push(`/channel/subscribe/${id}`);
  };
  return {handleRouting};
};
