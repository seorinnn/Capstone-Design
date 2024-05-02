//eslint-disable-next-line
import * as React from "react";
import { useState } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import styles from "./Search.module.css";
import { Link } from "react-router-dom";
import jsondata from "../api/mock.json";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

/**검색 부분*/
function Search() {
  const s = jsondata.projects;

  let [region, setRegion] = useState("");
  let [job, setJob] = useState("");
  let [detail, setDetail] = useState("");
  let [views, setViews] = useState(0);
  let [search, setSearch] = useState("");

  let copydata = s.sort();

  function onSearchHandler(event) {
    setSearch(event.target.value);
  }

  function handleChange1(event) {
    setRegion(event.target.value);
  }
  function handleChange2(event) {
    setJob(event.target.value);
  }
  function handleChange3(event) {
    setDetail(event.target.value);
  }
  function handleChange4(event) {
    if (event.target.value === "조회수") {
      setView("조회수");
      copydata = s.sort((a, b) => a.views - b.views);
    } else if (event.target.value === "높은순") {
      setView("높은순");
      copydata = s.sort((a, b) => b.views - a.views);
    }
  }

  const navigate = useNavigate();
  function moveToResisterProject() {
    navigate("/RegisterProject");
  }

  const result = s
    .filter((project) => {
      if (search === "") {
        return project;
      } else if (project.title.toLowerCase().includes(search.toLowerCase())) {
        return project;
      } else if (
        project.publisher.toLowerCase().includes(search.toLowerCase())
      ) {
        return project;
      } else return 0;
    })
    .filter((project) => {
      if (view === "") {
        return project;
      } else if (view === "조회수") {
        return project;
      } else if (view === "높은순") {
        return project;
      } else return 0;
    })
    .filter((project) => {
      if (region === "") {
        return project;
      } else if (project.region.toLowerCase().includes(region.toLowerCase())) {
        return project;
      } else return 0;
    })
    .map((project) => (
      <Link to={`/ProjectInformation/${project.slug}`} key={project.projectId}>
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <div
            style={{
              width: 680,
              height: 150,
              left: 0,
              top: 0,
              position: "relative",
              background: "white",
              borderRadius: 20,
              border: "0.20px rgba(0, 0, 0, 0.50) solid",
            }}
          />
          <div
            style={{
              width: 100,
              height: 100,
              left: 25,
              top: 12,
              position: "absolute",
            }}
          >
            <img
              className={styles.photo}
              alt="img"
              src={require(`../assets/${project.image}`)}
            />
          </div>
          <div
            style={{
              width: 470,
              height: 25,
              left: 150,
              top: 11,
              position: "absolute",
              color: "black",
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              width: 470,
              height: 69,
              left: 150,
              top: 43,
              position: "absolute",
              color: "rgba(0, 0, 0, 0.50)",
              fontSize: 15,
              fontFamily: "Inter",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            {project.introduction}
          </div>
          <div
            style={{
              width: 20,
              height: 20,
              left: 25,
              top: 124,
              position: "absolute",
              background: "#CCCCCC",
            }}
          ></div>
          <div
            style={{
              width: 20,
              height: 20,
              left: 86,
              top: 124,
              position: "absolute",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                left: 0,
                top: 0,
                position: "absolute",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  left: 0,
                  top: 0,
                  position: "absolute",
                }}
              ></div>
              <div
                style={{
                  width: 18,
                  height: 13,
                  left: 0,
                  top: 0,
                  position: "absolute",
                  background: "#CCCCCC",
                }}
              >
                {project.views}
              </div>
            </div>
          </div>
          <div
            style={{
              width: 180,
              height: 20,
              left: 150,
              top: 123,
              position: "absolute",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            작성자 : {project.publisher}
          </div>
          <div
            style={{
              width: 250,
              height: 20,
              left: 430,
              top: 123,
              position: "absolute",
              color: "black",
              fontSize: 16,
              fontFamily: "Inter",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            최근 업데이트 날짜 : {project.date}
          </div>
        </div>
      </Link>
    ));

  return (
    <>
      <div>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "1000px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="검색"
            value={search}
            onChange={onSearchHandler}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
          <Button
            className={styles.button}
            label="Searchbtn"
            variant="contained"
            color="secondary"
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
          <InputLabel id="demo-simple-select-label">지역</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="지역"
            onChange={handleChange1}
          >
            <MenuItem value={""}>지역</MenuItem>
            <MenuItem value={"서울"}>서울</MenuItem>
            <MenuItem value={"춘천"}>춘천</MenuItem>
            <MenuItem value={"강릉"}>강릉</MenuItem>
            <MenuItem value={"부산"}>부산</MenuItem>
          </Select>
        </FormControl>
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
          <InputLabel id="demo-simple-select-label">세부 직무</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={detail}
            label="세부 직무"
            onChange={handleChange3}
          >
            <MenuItem value={"None"}></MenuItem>
            <MenuItem value={`디자인`}>디자인</MenuItem>
            <MenuItem value={`디자인`}>디자인</MenuItem>
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
            <MenuItem value={"조회수"}>조회수</MenuItem>
            <MenuItem value={`높은순`}>높은순</MenuItem>
            <MenuItem value={`낮은순`}>낮은순</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: `flex`, width: "100%" }}>{result}</div>
    </>
  );
}

export default Search;
