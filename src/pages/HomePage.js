import styles from "./HomePage.module.css";
import ProjectSummary from "../components/ProjectSummary.js";

function HomePage() {
  return (
    <>
      <div className={styles.home}>
        <div className={styles.homeHeaderDiv}>
          <header className={styles.homeHeader}>
            <img
              alt="homeImg"
              src={require("../assets/home_instruction.png")}
            />
          </header>
        </div>

        <main className={styles.main}>
          <h3>현재 구인중인 프로젝트들</h3>
          <div className={styles.projectSummary}>
            <ProjectSummary />
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;
