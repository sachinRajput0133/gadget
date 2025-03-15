import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@/store';
import '@/styles/globals.css';
import MainLayout from '@/components/layouts/MainLayout';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  
  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...props.pageProps} />
      </MainLayout>
    </Provider>
  );
}

export default wrapper.withRedux(App);
