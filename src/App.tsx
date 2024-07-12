import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./modules/home/page/Home";
import ContentLayout from "./layouts/ContentLayout";
import News from "./modules/news/page/News";
import CreatePost from "./modules/CreatePost";
import NotFound from "./modules/notfound/NotFound";
import MediaContext from "./modules/mediadetall/MediaContext";
import { Toaster } from "react-hot-toast";
import CheckIsLogin from "./components/CheckIsLogin";
import AccoutDetall from "./modules/accoutdetall/AccoutDetall";
export default function App() {
  return (
    <>
      <div>
        <Toaster position="top-right" />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <ContentLayout>
                  <Home />
                </ContentLayout>
              }
            />
            <Route
              path="/news"
              element={
                <ContentLayout>
                  <News />
                </ContentLayout>
              }
            />
            <Route
              path="/createpost"
              element={
                <ContentLayout>
                  <CreatePost />
                </ContentLayout>
              }
            />
            <Route
              path="/pin/:id/:slug"
              element={
                <ContentLayout>
                  <MediaContext />
                </ContentLayout>
              }
            />
            <Route
              path="/profile/"
              element={
                <CheckIsLogin>
                  <ContentLayout>
                    <AccoutDetall />
                  </ContentLayout>
                </CheckIsLogin>
              }
            />
            <Route
              path="*"
              element={
                <ContentLayout>
                  <NotFound />
                </ContentLayout>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
