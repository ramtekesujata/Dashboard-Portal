import { FC, PropsWithChildren } from "react";

interface AppContainerProps {}
const AppContainer: FC<PropsWithChildren<AppContainerProps>> = ({
  children,
}: PropsWithChildren<AppContainerProps>) => {
  try {
    const authenticatedUser = sessionStorage.getItem("authenticatedUser");
    if (!authenticatedUser) {
      window.location.href = "/login";
      return <div>Not Authenticated!</div>;
    }

    const { isAuthenticated } = JSON.parse(authenticatedUser);
    if (!isAuthenticated) {
      window.location.href = "/login";
      return <div>Not Authenticated!</div>;
    }
  } catch (e) {
    window.location.href = "/login";
    return <div>Not Authenticated!</div>;
  }

  return (
    <div className="vh-100 bg-light">
      <div className="bg-primary w-100" style={{ height: "6px" }}>
        <div className="vstack gap-3 px-5 py-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppContainer;