import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMediaQueriesContext } from "../../context/MediaQueryContext";

export const Paginator = ({ currentPage, pages, url, query }) => {
  const { setFetchHotelStatus } = useMediaQueriesContext();
  let links = [];
  currentPage = Number(currentPage);
  pages = Number(pages);

  if (currentPage && pages) {
    if (pages > 7) {
      if (currentPage - 4 > 0) {
        if (currentPage - 7 > 2) {
          links.push(1);
          links.push(2);
          links.push("....");
        }
        for (let i = currentPage - 4; i < currentPage; i++) {
          links.push(i);
        }
      } else {
        for (let i = 1; i < currentPage; i++) {
          links.push(i);
        }
      }
      links.push(currentPage);

      if (currentPage + 3 < pages) {
        links.push(currentPage + 1);
        links.push(currentPage + 2);
        links.push(currentPage + 3);
      } else {
        for (let i = currentPage + 1; i <= pages; i++) {
          links.push(i);
        }
      }

      if (pages > currentPage + 7) {
        links.push("....");
        for (let i = pages - 2; i <= pages; i++) {
          links.push(i);
        }
      } else {
        for (let i = currentPage + 4; i <= pages; i++) {
          links.push(i);
        }
      }
    } else {
      for (let i = 1; i <= pages; i++) {
        links.push(i);
      }
    }
    return (
      <>
        {currentPage > 1 ? (
          <li className="previous" onClick={() => setFetchHotelStatus("idle")}>
            <Link
              to={
                `${url}?${query}&page=${currentPage - 1}`

                // url +
                // "?page=" +
                // (currentPage - 1) +
                // (query === "" ? "" : "&" + query)
              }
            >
              <FaAngleLeft className="inline text-xl" />
            </Link>
          </li>
        ) : (
          <li
            className="disabled previous"
            onClick={() => setFetchHotelStatus("idle")}
          >
            <a>
              <FaAngleLeft className="inline text-xl" />
            </a>
          </li>
        )}
        {links.map((link) => {
          if (link === currentPage) {
            return (
              <li
                key={currentPage}
                className="active"
                onClick={() => setFetchHotelStatus("idle")}
              >
                <a>{currentPage}</a>
              </li>
            );
          } else if (link === "....") {
            return (
              <li key="...." className="disabled">
                <a>.....</a>
              </li>
            );
          } else {
            let constr = `${url}?${query}&page=${link}`;
            //   url + "?page=" + link + (query === "" ? "" : "&" + query);

            return (
              <li key={link} onClick={() => setFetchHotelStatus("idle")}>
                <Link to={constr}>{link}</Link>
              </li>
            );
          }
        })}
        {currentPage < pages ? (
          <li className="next" onClick={() => setFetchHotelStatus("idle")}>
            <Link
              to={
                `${url}?${query}&page=${currentPage + 1}`
                // url +
                // "?page=" +
                // (currentPage + 1) +
                // (query === "" ? "" : "&" + query)
              }
            >
              <FaAngleRight className="inline text-xl" />
            </Link>
          </li>
        ) : (
          <li
            className="disabled next"
            onClick={() => setFetchHotelStatus("idle")}
          >
            <a>
              <FaAngleRight className="inline text-xl" />
            </a>
          </li>
        )}
      </>
    );
  }
  return null;
};
