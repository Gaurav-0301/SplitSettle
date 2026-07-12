import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleAuthWrapper = () => {
  return (
    <GoogleOAuthProvider clientId="174010930498-t9n1ao7jlf6oh4tc9gh2la8h1vo8e5v6.apps.googleusercontent.com">
      <div className="flex justify-center w-full bg-white/[0.02] border border-white/[0.08] rounded-xl overflow-hidden p-1 hover:bg-white/[0.05] transition-all duration-300">
        <GoogleLogin theme="filled_black" shape="rectangular" width="100%" />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthWrapper;