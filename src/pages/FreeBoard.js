import styles from "./FreeBoard.module.css";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BoardSummary from "../components/BoardSummary";

function FreeBoard() {
  const navigate = useNavigate();

  const moveToRegister = () => {
    navigate(`/BoardRegister`);
  };

  return (
    <body>
      <div className={styles.FreeBoard}>
        <h1 className={styles.header}>자유게시판</h1>
      </div>
      <div className={styles.body}>
        <h2>번호</h2>
        <h2>제목</h2>
        <h2>작성자</h2>
        <h2>작성일</h2>
        <h2>조회수</h2>
      </div>
      <div
      style={{
        width: "100%",
        paddingLeft: "200px",
        paddingRight: "200px",
        borderBottom: "3px solid #aaa",
        lineHeight: "0.1em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    />
    <div>

    </div>
    <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
          <Button
            className={styles.button2}
            label="게시글 등록하기"
            variant="contained"
            color="secondary"
            onClick={moveToRegister}
          >
            게시글 등록하기
          </Button>
          <BoardSummary />
    </body>
  );
}

export default FreeBoard;