import withAuth from "../lib/withAuth";

export const getServerSideProps = context => {
  return withAuth.isAuthorized(context);
};

const isauth = () => {
  return (
    <div className="default">
      <p>You are Authorized</p>
      <p>If you weren't</p>
      <p>You couldn't access this page</p>
    </div>
  );
};

export default withAuth(isauth);
