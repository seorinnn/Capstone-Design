import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import RegisterProject from "./components/RegisterProject";
import ProjectInformationPage from "./pages/ProjectInformationPage";
import ProjectDetail from "./components/ProjectDetail";
import UpdateProject from "./pages/UpdateProject";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KakaoRedirectPage from "./pages/KakaoRedirectPage";
import QuestionPage from "./pages/question/ListPage";
import QuestionRead from "./pages/question/ReadPage";

function Main() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ProjectList" element={<ProjectListPage />} />
          <Route path="/Question" element={<QuestionPage />} />
          <Route path="/Question/list" element={<QuestionPage />} />
          <Route path="/Question/read/:qno" element={<QuestionRead />} />
          <Route path="/RegisterProject" element={<RegisterProject />} />
          <Route path="/UpdateProject/:idx" element={<UpdateProject />} />
          <Route path="/ProjectInformation/:idx" element={<ProjectDetail />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route
            path="/oauth/redirected/kakao"
            element={<KakaoRedirectPage />}
          ></Route>
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/FreeBoard" element={<FreeBoard/>} />
          <Route
            path="/BoardInformation/:boardslug"
            element={<BoardInformation />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Main;
