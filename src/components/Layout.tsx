import {
  useMenu,
  useNavigation,
  LayoutProps,
  useLogout,
} from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { menuItems } = useMenu();
  const { push } = useNavigation();
  const { mutate: logout } = useLogout();

  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center bg-gray-300 p-4">
            <div className="flex">
              <Link to="/">
                <img
                  className="w-32"
                  src="https://refine.dev/img/refine_logo.png"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="flex">
              <button
                className="btn btn-outline-danger"
                onClick={() => logout()}
              >
                click here to logout.
              </button>
            </div>
          </header>
          <div className="flex h-full">
            <nav className="flex w-72 h-full bg-gray-300">
              <div className="w-full flex mx-auto px-6 py-8">
                <div className="w-full h-full flex items-center justify-center text-gray-900 text-xl"></div>
              </div>
            </nav>
            <main className="flex flex-col w-full bg-white overflow-x-hidden overflow-y-auto mb-14">
              <div className="flex w-full mx-auto px-6 py-8">
                <div className="flex flex-col w-full h-full text-gray-900 text-xl">
                  <div className="bg-white">{children}</div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="flex justify-between items-center bg-gray-300 p-4"></div>
      </div>
    </>
  );
};
