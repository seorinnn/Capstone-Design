import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import RegisterProject from "./components/RegisterProject";
import ProjectDetail from "./components/ProjectDetail";
import UpdateProject from "./pages/UpdateProject";
import StudyListPage from "./pages/study/StudyListPage";
import RegisterStudy from "./components/study/RegisterStudy";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KakaoRedirectPage from "./pages/KakaoRedirectPage";
import QuestionPage from "./pages/question/ListPage";
import QuestionRead from "./pages/question/ReadPage";
import FreeBoard from "./pages/FreeBoard";
import Applycation from "./pages/Applycation";
import StudyDetail from "./components/study/StudyDetail";
import BoardRegister from "./pages/BoardRegister";
import BoardDetail from "./components/BoardDetail";
import BoardUpdate from "./pages/BoardUpdate";

function Main() {
  return (
    <AuthProvider>
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
          <Route path="/BoardUpdate/:idx" element={<BoardUpdate />} />
          <Route path="/ProjectInformation/:idx" element={<ProjectDetail />} />
          <Route path="/Applycation/:idx" element={<Applycation />} />
          <Route path="/StudyList" element={<StudyListPage />} />
          <Route path="/RegisterStudy" element={<RegisterStudy />} />
          <Route path="/StudyInformation/:idx" element={<StudyDetail />} />
          <Route path="/MyPage/:loginId" element={<MyPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route
            path="/oauth/redirected/kakao"
            element={<KakaoRedirectPage />}
          ></Route>
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="/FreeBoard" element={<FreeBoard/>} />
          <Route path="/BoardRegister" element={<BoardRegister/>} />
          <Route
            path="/BoardInformation/:idx"
            element={<BoardDetail />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Main;
