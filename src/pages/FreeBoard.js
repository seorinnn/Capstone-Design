import styles from "./FreeBoard.module.css";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BoardSummary from "../components/BoardSummary.js";
import SearchBoard from "../components/SearchBoard.js";

function FreeBoard() {
  return (
    <>
      <div className={styles.FreeBoard}>
        <h1 className={styles.header}>자유게시판</h1>
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
            justifyContent: "center",
          }}
        />
        <div className={styles.searchBoard}>
          <SearchBoard />
        </div>
      </div>
    </>
  );
}

export default FreeBoard;
