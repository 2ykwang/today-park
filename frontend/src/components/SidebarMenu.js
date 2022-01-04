import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as SearchBtn } from "../image/search.svg";
import { ReactComponent as BookmarkBtnFilled } from "../image/bookmark-maked.svg";

export function SidebarMenu(props) {
  let clicked = props.item;
  return (
    <>
      <div className="sidebar-menu">
        <Link
          to="/search"
          className={
            "sidebar-menu item " + (clicked === "search" && "clicked-item")
          }
        >
          <SearchBtn
            width="28"
            height="28"
            className={"icon " + (clicked === "search" && "clicked-icon")}
          />
        </Link>
        <Link
          to="/search/bookmark"
          className={
            "sidebar-menu item " + (clicked === "bookmark" && "clicked-item")
          }
        >
          <BookmarkBtnFilled
            width="28"
            height="28"
            className={"icon " + (clicked === "bookmark" && "clicked-icon")}
          />
        </Link>
      </div>
    </>
  );
}
