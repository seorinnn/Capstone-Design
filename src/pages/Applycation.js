import styles from "./FreeBoard.module.css";
import BoardSearch from "../components/BoardSearch.js";

function FreeBoard() {
  return (
    <body>
      <div style={{ display: "flex" }}>
        <h1 className={styles.mainletter}>자유게시판</h1>
      </div>
      <div>
        <h1 className={styles.mainletter}>검색</h1>
        <BoardSearch />
      </div>
    </body>
  );
}

export default FreeBoard;