import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient';
import Header from '../components/header';

const App = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

App.getInitialProps = async context => {
  const { ctx, Component } = context;

  const client = buildClient(ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (Component.getInitialProps) pageProps = await Component.getInitialProps(context.ctx);

  return { pageProps, ...data };
};

export default App;
