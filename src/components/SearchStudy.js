//eslint-disable-next-line
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import styles from "./SearchStudy.module.css";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";

/**검색 부분*/
function SearchStudy() {
  const [views, setViews] = useState("");
  const [job, setJob] = useState("");
  const [search, setSearch] = useState("");
  const [filteredProject, setFilteredProject] = useState([]);
  const [sortProject, setSortProject] = useState([]);
  const [projectList, setProjectList] = useState("");

  const getProjectList = async () => {
    const response = await axios.get("/api/posts", {
      params: {
        category: "STUDY",
      },
    });
    setProjectList(response.data.content);
    setFilteredProject(response.data.content);
  };
  useEffect(() => {
    getProjectList();
  }, []);

  const onSearchtext = (event) => {
    const searchtext = event.target.value.toLowerCase();
    setSearch(searchtext);
  };
  const onSearchHandler = () => {
    const filtered = projectList.filter((project) =>
      project.title.toLowerCase().includes(search)
    );
    setFilteredProject(filtered);
  };

  function handleChange2(event) {
    setJob(event.target.value);
  }
  function handleChange4(event) {
    if (event.target.value === "높은순") {
      filteredProject.sort((a, b) => a.view_count - b.view_count);
    } else if (event.target.value === "낮은순") {
      filteredProject.sort((a, b) => b.view_count - a.view_count);
    }
    setFilteredProject(filteredProject);
  }

  //등록하기 버튼 함수
  const navigate = useNavigate();
  function moveToResisterProject() {
    navigate("/RegisterProject");
  }

  // const result = projectList
  //   .filter((project) => {
  //     if (search === "") {
  //       return project;
  //     } else if (project.title.toLowerCase().includes(search.toLowerCase())) {
  //       return project;
  //     } else return 0;
  //   })
  //   .filter((project) => {
  //     if (views === "") {
  //       return project;
  //     } else if (views === "조회수") {
  //       return project;
  //     } else if (views === "높은순") {
  //       return project;
  //     } else return 0;
  //   })
  //   .map((project) => (
  //     <div className={styles.inner}>
  //       <div className={styles.projectSummary}>
  //         <Link
  //           to={`/ProjectInformation/${project.id}`}
  //           key={project.projectId}
  //         >
  //           <img
  //             className={styles.photo}
  //             alt="img"
  //             src={require(`../assets/DefaultProjectImg.jpg`)}
  //           />
  //           <p className={styles.mainletter}>{project.title}</p>
  //         </Link>
  //       </div>
  //     </div>
  //   ));

  return (
    <>
      <div className={styles.main}>
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "1200px",
            }}
          >
            <input
              className={styles.search}
              type="text"
              placeholder="검색"
              value={search}
              onChange={onSearchtext}
            />
            <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
            <Button
              className={styles.button}
              label="Searchbtn"
              variant="contained"
              color="secondary"
              onClick={onSearchHandler}
            >
              검색
            </Button>
            <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
            <Button
              className={styles.button2}
              label="프로젝트 등록하기"
              variant="contained"
              color="secondary"
              onClick={moveToResisterProject}
            >
              프로젝트 등록하기
            </Button>
          </Paper>
        </div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">직무</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={job}
              label="직무"
              onChange={handleChange2}
            >
              <MenuItem value={"None"}></MenuItem>
              <MenuItem value={`프론트엔드`}>프론트엔드</MenuItem>
              <MenuItem value={`백엔드`}>백엔드</MenuItem>
              <MenuItem value={`디자인`}>디자인</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">조회수</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={views}
              label="조회수"
              onChange={handleChange4}
            >
              <MenuItem value={`높은순`}>높은순</MenuItem>
              <MenuItem value={`낮은순`}>낮은순</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.inner}>
          {filteredProject.map((project) => (
            <div className={styles.projectSummary}>
              <Link
                to={`/ProjectInformation/${project.id}`}
                key={project.projectId}
              >
                <img
                  className={styles.photo}
                  alt="img"
                  src={require(`../assets/DefaultProjectImg.jpg`)}
                />
                <p className={styles.pmainletter}>{project.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchStudy;
