
// pages/_app.js
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Layout from './components/Layout.js'; 
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher: (...args) => fetch(...args).then(res => res.json()) }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
