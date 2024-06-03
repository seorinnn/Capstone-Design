import { useNavigate } from "react-router-dom";
import styles from "./StudyListPage.module.css";
import StudySummary from "../../components/study/StudySummary";
import SearchStudy from "../../components/SearchStudy";

function StudyListPage() {
  // const [studyList, setStudyList] = useState([]);

  // //스터디 리스트 받아오는 함수
  // const getStudyList = async () => {
  //   const response = await axios.get("/api/posts", {
  //     params: {
  //       category: "STUDY",
  //     },
  //   });
  //   setStudyList(response.data.content);
  // };
  // useEffect(() => {
  //   getStudyList();
  // }, []);

  //등록하기 버튼 함수
  const navigate = useNavigate();
  function moveToResisterStudy() {
    navigate("/RegisterStudy");
  }

  return (
    <>
      <div className={styles.projectListPage}>
        <h1 className={styles.mainletter}>📖 신규 스터디</h1>
        <div className={styles.newProject}>
          <StudySummary />
        </div>
        <h1 className={styles.mainletter}>&#128150; 관심 많은 스터디</h1>
        <div className={styles.likeProject}>
          <StudySummary />
        </div>
        <h1 className={styles.mainletter}>검색</h1>
        <div className={styles.searchProject}>
          <SearchStudy />
        </div>
      </div>
      

      <button onClick={moveToResisterStudy}>스터디 등록하기</button>
    </>
  );
}

export default StudyListPage;
