import React from "react";
import styles from "./Project.module.css";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Project = ({
  title,
  content,
  fieldList = [],
  imageUrl = {},
  memberId,
  startDate,
  endDate,
}) => {
  // startDate, endDate 추가
  const navigate = useNavigate();
  const { idx } = useParams();

  const moveToUpdate = () => {
    navigate(`/UpdateProject/${idx}`);
  };

  const moveToApply = (fieldCategory) => {
    navigate(`/Applycation/${idx}`, { state: { fieldCategory } });
  };

  const deleteProject = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await axios.delete(`/api/posts/${idx}`).then((res) => {
        alert("삭제되었습니다.");
        navigate("/ProjectList");
      });
    }
  };

  // 추가부분
  const startConversation = async () => {
    try {
      const response = await axios.post("/api/messages/conversation", {
        postId: idx,
        receiverId: memberId,
      });
      navigate(`/conversation/${response.data.id}`);
    } catch (err) {
      console.error("Failed to start conversation:", err);
      alert("Failed to start conversation");
    }
  };

  return (
    <>
      <div className={styles.projectInformation}>
        <div className={styles.recru}>
          <p>채용 상태</p>
        </div>
        <header className={styles.projectInfoHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.headerInfoTitle}>
              <h1>{title}</h1>
            </div>
            <p>사용자 정보</p>
            <button onClick={startConversation}>작성자와 채팅</button>{" "}
            {/* New button */}
          </div>
        </header>
        <main className={styles.projectInfoMain}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>프로젝트 소개 및 기간</h3>
            <hr />
            <div className={styles.contents}>
              <p>
                프로젝트 기간: {startDate} ~ {endDate}
              </p>{" "}
              {/* 추가된 부분 */}
              <p>{content}</p>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>현재 모집 현황</h3>
            <hr />
            <div className={styles.contents}>
              {fieldList.map((field, index) => (
                <div key={index} className={styles.recruitmentDiv}>
                  <p>{field.fieldCategory}</p>
                  <p>
                    {field.currentRecruitment} / {field.totalRecruitment}
                  </p>
                  <button
                    className={styles.btn}
                    onClick={() => moveToApply(field.fieldCategory)}
                  >
                    지원
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>기술</h3>
            <hr />
            <div className={styles.contents}>
              <p>기술 이미지</p>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>참고 링크</h3>
            <hr />
            <div className={styles.contents}>참고 링크</div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>댓글</h3>
            <hr />
            <div className={styles.contents}>
              <p>댓글</p>
            </div>
          </div>
        </main>
        <footer>
          <div className={styles.inner}>
            <button onClick={moveToUpdate} className={styles.btn}>
              수정
            </button>
            <button onClick={deleteProject} className={styles.btn}>
              삭제
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Project;
