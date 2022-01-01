import React, { useState } from "react";
import { Header } from "./Header";
import Map from "./Map";
import ReactTooltip from "react-tooltip";
import { ReactComponent as BookmarkBtnEmpty } from "../image/bookmark-empty.svg";
import { SidebarMenu } from "./SidebarMenu";

export function SidebarBookmark() {
  const [content, setContent] = useState("");
  return (
    <>
      <Header />
      <section className="search">
        <SidebarMenu item={"bookmark"} />
        <div className="sidebar"></div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}

function SidebarSearch() {
  const [content, setContent] = useState("");
  return (
    <>
      <Header />
      <section className="search">
        <SidebarMenu item={"search"} />
        <div className="sidebar"></div>
        <Map setTooltipContent={setContent} />
        <ReactTooltip>{content}</ReactTooltip>
      </section>
    </>
  );
}

export default SidebarSearch;
