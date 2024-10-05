import React from "react";

import business from "@/content/settings/business.json";
import general from "@/content/settings/general.json";

import SeoContainer from "@/containers/SeoContainer";
import HeaderContainer from "@/containers/HeaderContainer";
import FooterContainer from "@/containers/FooterContainer";

const infos = {
  slug: "/404",
  title: `Error Page - ${business?.brandName}`,
  description: "This is a 404 error page.",
  author: business?.brandName,
  questions: [],
  topology: null,
  articleUrl: `${general?.siteUrl}/404`,
};

const NotFoundPage = ({ type }) => {
  return (
    <div className="error-page">
      <SeoContainer killSeo={false} data={infos} />
      <div className="page-wrapper">
        <HeaderContainer
          opt={{
            bgOne: "transparent",
            bgTwo: "transparent",
            classes: "header-block",
            pageHasMenu: true,
          }}
          hasMenu={false}
          gtag={"gtag"}
        />
        <main className="main-container-wrapper">
          <div className="main-container">
            <h2>Error page</h2>
            <h1>Search Boilerplate Times</h1>
          </div>
        </main>
      </div>

      <div className="wrapper-box"></div>
      <FooterContainer />
    </div>
  );
};

export default NotFoundPage;
