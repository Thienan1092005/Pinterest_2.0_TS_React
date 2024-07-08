import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./modules/home/page/Home";
import ContentLayout from "./layouts/ContentLayout";
import News from "./modules/news/page/News";
import CreatePost from "./modules/CreatePost";
import NotFound from "./modules/notfound/NotFound";
import MediaContext from "./modules/mediadetall/MediaContext";

export default function App() {
  return (
    <>
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
