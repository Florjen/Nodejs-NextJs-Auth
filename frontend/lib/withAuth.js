//import React from "react";

const withAuth = (Page = "") => {
  const HOC = pageProps => {
    return (
      <>
        <Page {...pageProps} />
      </>
    );
  };
  return HOC;
};

// call this function within the pages getServerSideProps
//check isauth page for details
withAuth.isAuthorized = context => {
  // we are looking for the JWT cookie called 'jwt' in our case
  // if it exists, then set isAuthorized to true
  const isAuthorized = context.req.cookies.jwt ? true : false;
  // if user is not authorized than redirect to login page
  if (!isAuthorized) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      isAuthorized,
    },
  };
};

export default withAuth;
