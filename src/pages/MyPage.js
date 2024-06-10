import { useEffect, useState } from "react";
import axios from "../lib/axios";
import styles from "./MyPage.module.css";
import heartBeforeImg from "../assets/heartBefore.png";
import heartAfterImg from "../assets/heartAfter.png";

function MyPage() {
  const [user, setUser] = useState(null);
  //하트 이미지
  const [imageSrc, setImageSrc] = useState(heartBeforeImg);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem("accessToken");
        console.log(token);

        if (token) {
          //토큰이 있다면 서버에 GET 요청 보내 유저 정보 가져옴
          const response = await axios.get("/api/members/member", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          //서버에서 받아온 유저 정보로 상태 변경. 컴포넌트 리렌더링
          setUser(response.data);
        } else {
          alert("토큰이 없음");
        }
      } catch (error) {
        alert("유저 정보 불러오기 실패", error);
      }
    };
    fetchUserData();
  }, []);

  //하트 click 함수
  const handleClick = () => {
    if (isClicked) {
      setImageSrc(heartBeforeImg);
      setIsClicked(false); //초기 상태로
    } else {
      setImageSrc(heartAfterImg);
      setIsClicked(true);
    }
  };
  return (
    <>
      <div className={styles.MyPage}>
        <div className={styles.profile}>
          <img alt="profileImg" src={require(`../assets/profileImg.avif`)} />
          <div className={styles.profileInfo}>
            <section className={styles.section1}>
              <h2>{user?.username}</h2>
              <p className={styles.major}>(전공자)</p>
              <img alt="heart" src={imageSrc} onClick={handleClick} />
            </section>
            <section className={styles.section2}>
              <p className={styles.info}>
                안녕하세요 저는~어쩌구저쩌구 저는서린이구요 좀이따밥먹을것입니다
                제대로나오는지확인중
              </p>
            </section>
            <section className={styles.section3}>
              <h2>내 전공</h2>
              <p>웹 프론트엔드</p>
            </section>
            <section className={styles.section4}>
              <h2>내 기술스택</h2>
              <img alt="reactImg" src={require(`../assets/react.png`)} />
            </section>
          </div>
        </div>
        <div className={styles.userProject}>
          <div className={styles.presentProject}>
            <h3>구인중인 프로젝트</h3>
            <img
              alt="projectImg"
              src={require(`../assets/projectImg_couple.avif`)}
            ></img>
            <p>커플 앱 프로젝트</p>
          </div>
          <div className={styles.pastProject}>
            <h3>구인했던 프로젝트</h3>
            <img
              alt="projectImg"
              src={require(`../assets/projectImg_exercise.png`)}
            ></img>
            <p>운동 웹사이트 프로젝트</p>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default MyPage;
