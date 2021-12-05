import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';

import { parseCookies } from 'nookies';

import { COOKIE_USER_KEY } from '@/store/user.slice';

type SSRMiddleware<DataProps> = GetServerSideProps<DataProps>;

export function withSSRAuth<T = any>(middleware: SSRMiddleware<T>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(ctx);

    if (!cookies[COOKIE_USER_KEY]) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      };
    }

    return await middleware(ctx);
  };
}
