import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./BoardInformation.module.css";
import { getBoardBySlug } from "../api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function BoardInformation() {
  /*현재 URL에서 추출한 동적으로 설정된 파라미터 값
  ex) URL이 "/ProjectInformation/couple-app" 인 경우
  projectSlug에는 couple-app이 들어감 */

  /*<Route
      path="/ProjectInformation/:projectSlug"
      element={<ProjectInformationPage />}
    />
    Main.js에서 내가 동적 매개변수의 값을 :projectSlug로 지정했기 때문*/
  const { boardslug } = useParams();
  const board = getBoardBySlug(boardslug);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background: "white",
        }}
      >
        <div
          style={{
            width: 374,
            height: 99,
            left: 532,
            top: 149,
            position: "absolute",
            color: "#A77BFF",
            fontSize: 80,
            fontFamily: "Inter",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          자유게시판
        </div>
        <div
          style={{
            width: 972,
            height: 0,
            left: 231,
            top: 380,
            position: "absolute",
            border: "1px black solid",
          }}
        ></div>
        <div
          style={{
            width: 950,
            height: 37,
            left: 234,
            top: 389,
            position: "absolute",
            color: "black",
            fontSize: 30,
            fontFamily: "Inter",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          {board.publisher} {board.date}
        </div>
        <div
          style={{
            width: 950,
            height: 37,
            left: 234,
            top: 472,
            position: "absolute",
            color: "black",
            fontSize: 30,
            fontFamily: "Inter",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          {board.contents}
        </div>
        <div
          style={{
            width: 950,
            height: 37,
            left: 236,
            top: 315,
            position: "absolute",
            color: "black",
            fontSize: 40,
            fontFamily: "Inter",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          {board.title}
        </div>
        <div
          style={{
            width: 154,
            height: 36,
            left: 236,
            top: 579,
            position: "absolute",
            background: "white",
            borderRadius: 20,
            border: "3px #A77BFF solid",
          }}
        />
        <div
          style={{
            width: 143,
            height: 29,
            left: 275,
            top: 586,
            position: "absolute",
            color: "black",
            fontSize: 20,
            fontFamily: "Inter",
            fontWeight: "300",
            wordWrap: "break-word",
          }}
        >
          수정하기
        </div>
        <div
          style={{
            width: 1287,
            height: 682,
            left: 76,
            top: 264,
            position: "absolute",
            background: "rgba(255, 255, 255, 0)",
            border: "3px black solid",
          }}
        />
      </div>
    </>
  );
}

export default BoardInformation;
