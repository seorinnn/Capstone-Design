import { useState } from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [loginIdChecked, setLoginIdChecked] = useState(false);

  //초기 values 설정
  const [values, setValues] = useState({
    username: "",
    nickname: "",
    email: "",
    loginId: "",
    password: "",
    major: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  //닉네임 중복 체크
  async function checkNicknameAvailability() {
    const { nickname } = values;
    try {
      const response = await axios.get(
        `/api/members/exists/nickname?nickname=${nickname}`
      );
      const isNicknameTaken = response.data;

      if (isNicknameTaken) {
        //이미 사용중인 닉네임인 경우
        alert("이미 사용중인 닉네임입니다.");
        setNicknameChecked(false);
      } else {
        //사용하지 않은 닉네임인 경우
        alert("사용 가능한 닉네임입니다.");
        setNicknameChecked(true);
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  }

  //아이디 중복 체크
  async function checkLoginIdAvailability() {
    const { loginId } = values;
    try {
      const response = await axios.get(
        `/api/members/exists/loginId?loginId=${loginId}`
      );
      const isLoginIdTaken = response.data;

      if (isLoginIdTaken) {
        //이미 사용중인 아이디인 경우
        alert("이미 사용중인 아이디입니다.");
        setLoginIdChecked(false);
      } else {
        //사용하지 않은 아이디인 경우
        alert("사용 가능한 아이디입니다.");
        setLoginIdChecked(true);
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  }

  //form submit 함수
  async function handleSubmit(e) {
    e.preventDefault();

    //비밀번호와 비밀번호확인값이 같은지 확인
    // if (values.password !== values.passwordRepeat) {
    //   alert("비밀번호가 일치하지 않습니다");
    //   return;
    // }

    if (!nicknameChecked) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }
    if (!loginIdChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    const { username, nickname, email, loginId, password, major } = values;

    try {
      const response = await axios.post(
        "/api/members/sign-up",
        { username, nickname, email, loginId, password, major },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("회원가입 성공"); // 성공했을 경우 응답 데이터
      navigate("/LoginPage");
    } catch (error) {
      console.error("Error during request:", error);
      alert("회원가입 실패");
    }

    //await axios.post("/auth/login", { email, password }); //회원가입 후 로그인 하기
  }

  //카카오로그인
  // const handleKakaoLoginClick = () => {
  //   window.location.href = "http://localhost:8080/oauth/kakao"; //페이지 리다이렉트
  // };

  return (
    <>
      <div className={styles.registerPage}>
        <h1 className={styles.header}>회원가입 &#128075;</h1>
        <section className={styles.formLogin}>
          <form onSubmit={handleSubmit}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="이름"
              value={values.username}
              onChange={handleChange}
            />
            <input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임"
              value={values.nickname}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={checkNicknameAvailability}
              className={[styles.btn, styles.nickBtn].join(" ")}
            >
              중복 확인
            </button>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              value={values.email}
              onChange={handleChange}
            />
            <input
              id="loginId"
              name="loginId"
              type="text"
              placeholder="아이디"
              value={values.loginId}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={checkLoginIdAvailability}
              className={[styles.btn, styles.idBtn].join(" ")}
            >
              중복 확인
            </button>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={values.password}
              onChange={handleChange}
            />
            <input
              id="major"
              name="major"
              type="text"
              placeholder="전공"
              value={values.major}
              onChange={handleChange}
            />
            <button className={styles.submitButton} type="submit">
              회원가입
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default RegisterPage;
