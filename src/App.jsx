import { createHashRouter, RouterProvider } from "react-router";
import routes from "./router";
import { store } from "./store.js";
import { Provider } from "react-redux";

const router = createHashRouter(routes);
function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
