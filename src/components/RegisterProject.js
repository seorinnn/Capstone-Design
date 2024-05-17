import { useState } from "react";
import styles from "./RegisterProject.module.css";
import defaultProjectImg from "../assets/DefaultProjectImg.jpg";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

function RegisterProject() {
  const navigate = useNavigate();
  //프로젝트 배경이미지
  const [defaultProjectImgSrc, setDefaultProjectImgSrc] =
    useState(defaultProjectImg);

  const [projectInfo, setProjectInfo] = useState({
    title: "",
    category: "PROJECT",
    content: "",
    fieldList: [],
  });

  //비구조화 할당으로 projectInfo가 바로 값을 분해해 변수에 할당함
  const { title, category, content, fieldList } = projectInfo;

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져옴
    setProjectInfo({
      ...projectInfo,
      [name]: value,
    });
  };

  const handleFieldListChange = (index, event) => {
    const { name, value } = event.target;
    const newFieldList = [...fieldList];
    // 숫자로 변환해야 하는 필드인 경우 parseInt를 사용하여 숫자로 변환
    newFieldList[index][name] =
      name === "totalRecruitment" ? parseInt(value, 10) : value;
    setProjectInfo({
      ...projectInfo,
      fieldList: newFieldList,
    });
  };

  const addField = () => {
    setProjectInfo({
      ...projectInfo,
      fieldList: [...fieldList, { fieldCategory: "", totalRecruitment: 0 }],
    });
  };

  const postProject = async () => {
    await axios.post(`/api/posts`, projectInfo).then((res) => {
      alert("등록되었습니다.");
      navigate("/ProjectList");
    });
  };

  return (
    <>
      <div className={styles.RegisterProjectHeader}>
        <header>
          <h1>프로젝트 등록하기</h1>
        </header>
      </div>
      <main className={styles.RegisterProjectMain}>
        <div className={styles.projectImg}>
          <h3>대표 이미지 선택</h3>
          <img alt="profileImg" src={defaultProjectImgSrc} />
          <input type="file"></input>
        </div>
        <div className={styles.projectName}>
          <h3>프로젝트명</h3>
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <div className={styles.projectInfo}>
          <h3>프로젝트 소개 및 기간</h3>
          <textarea
            name="content"
            cols="30"
            rows="10"
            value={content}
            onChange={onChange}
          />
        </div>
        <div className={styles.recruitmentDiv}>
          <h3>모집 직무</h3>
          <button onClick={addField}>직무 추가</button>
          {fieldList.map((field, index) => (
            <div key={index}>
              <input
                type="text"
                name="fieldCategory"
                value={field.fieldCategory}
                onChange={(event) => handleFieldListChange(index, event)}
              />
              <input
                type="number"
                name="totalRecruitment"
                value={field.totalRecruitment}
                onChange={(event) => handleFieldListChange(index, event)}
              />
            </div>
          ))}
        </div>
        <div className={styles.language}>
          <h3>사용 기술 및 언어</h3>
        </div>
        <div className={styles.etc}>
          <h3>기타 참고사항</h3>
        </div>
        <div className={styles.buttons}>
          <button onClick={postProject}>등록하기</button>
        </div>
      </main>
    </>
  );
}

export default RegisterProject;
