import buildClient from '../api/buildClient';

const index = ({ currentUser }) => {
  return <h2 className="container">{currentUser ? 'You are signed in.' : 'You are not signed in.'}</h2>;
};

index.getInitialProps = async context => {
  console.log('LANDING PAGE ....');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default index;
