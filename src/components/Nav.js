//eslint-disable-next-line
import { Link, NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

function Nav() {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <img
            className={styles.Logo}
            alt="Logo"
            src={require(`../assets/paletteLogo.png`)}
          />
        </li>
        <li className={styles.homeLogo}>
          <Link to="/">Palette</Link>
        </li>
        <li className={styles.navProject}>
          <Link to="/ProjectList">프로젝트</Link>
        </li>
        <li className={styles.navProject}>
          <Link to="/FreeBoard">자유게시판</Link>
        </li>
        <li>
          <Link to="/Question">질의응답</Link>
        </li>
        {/* <li className={styles.myPage}>
          <Link to="/MyPage">내 정보</Link>
        </li> */}
        <div className={styles.userList}>
          <li className={styles.login}>
            <Link to="/LoginPage">로그인</Link>
          </li>
          <li className={styles.register}>
            <Link to="/RegisterPage">회원가입</Link>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Nav;
