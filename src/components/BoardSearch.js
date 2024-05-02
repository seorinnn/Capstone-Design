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
import styles from "./BoardSearch.module.css";
import { Link } from "react-router-dom";
import jsondata from "../api/boarddata.json";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

/**검색 부분*/
function BoardSearch() {
  const s = jsondata.boards;

  let [search, setSearch] = useState("");

  function onSearchHandler(event) {
    setSearch(event.target.value);
  }

  const result = s
    .filter((board) => {
      if (search === "") {
        return board;
      } else if (board.title.toLowerCase().includes(search.toLowerCase())) {
        return board;
      } else if (
        board.publisher.toLowerCase().includes(search.toLowerCase())
      ) {
        return board;
      } else return 0;
    })
    .map((board) => (
      <Link to={`/BoardInformation/${board.slug}`} key={board.boardId}>
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
            {board.title}
          </div>
        </div>
      </Link>
    ));

  return (
    <>
    <div style={{ display: `flex`, width: "100%" }}>{result}</div>
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
          >
            검색
          </Button>
          <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
          <Button
            className={styles.button2}
            label="프로젝트 등록하기"
            variant="contained"
          >
            프로젝트 등록하기
          </Button>
        </Paper>
      </div>
    </>
  );
}

export default BoardSearch;
