import buildClient from '../api/buildClient';

const index = ({ currentUser }) => {
  return (
    <h1 className="container">{currentUser ? 'You are signed in.' : 'You are not signed in.'}</h1>
  );
};

index.getInitialProps = async context => {
  console.log('LANDING PAGE ....');
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');

  return data;
};

export default index;
