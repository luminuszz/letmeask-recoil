import type { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import { globalStyles } from '@/styles';

import 'react-toastify/dist/ReactToastify.css';

globalStyles();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
      <Component {...pageProps} />;
    </RecoilRoot>
  );
}
