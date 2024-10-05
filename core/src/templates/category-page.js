import React, { useState, useEffect } from "react";
import slugify from "slugify";
import { usePathname } from "next/navigation";

import BlogList from "@/containers/BlogListContainer";
import HeaderContainer from "@/containers/HeaderContainer";
import FooterContainer from "@/containers/FooterContainer";

import postsData from "@/content/cache/allPostsData.json";
import integrations from "@/content/settings/integrations.json";
import general from "@/content/settings/general.json";
import theme from "@/content/settings/theme.json";

const CategoryPage = () => {
  const [btnGClick, handleBtnGClick] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [userInfos, setUserInfos] = useState(null);

  const locationURL = usePathname().slice(1, -1);
  const pathnameVAR = usePathname();
  const pathname = pathnameVAR === "/" ? "home" : pathnameVAR.slice(1, -1);

  const categoryPosts = [];
  postsData.allPosts.forEach((facp) =>
    facp.frontmatter.categories.forEach((catt) =>
      slugify(catt).toLowerCase() === locationURL &&
      new Date(facp.frontmatter.date) < new Date()
        ? categoryPosts.push(facp)
        : null
    )
  );
  const cleanedPosts = categoryPosts.filter(
    (e) => e.frontmatter?.featuredPost === false
  );
  const featuredPosts = categoryPosts.filter(
    (e) => e.frontmatter?.featuredPost === true
  );
  let arrPosts = featuredPosts;
  if (featuredPosts.length <= 10) {
    arrPosts = featuredPosts
      .concat(cleanedPosts)
      .slice(0, theme?.postsSettings?.postsToShow || 10);
  }
  const adClient =
    integrations?.googleIntegration?.adsClientID === "" ||
    integrations?.googleIntegration?.adsClientID === "ca-pub-"
      ? false
      : true;
  const gtagCounter = (id) => {
    if (btnGClick === null && typeof window !== "undefined" && adClient) {
      window?.gtag("event", id);
      handleBtnGClick(null);
    }
  };
  const fetchApiData = async () => {
    const res = await fetch(`${general?.siteUrl}/geolocation`);
    const data = await res.json();
    setUserInfos(data);
    setState(data?.geo?.subdivision?.name || "California");
    return setCity(data?.geo?.city || "Los Angeles");
  };

  useEffect(() => {
    // Fetch data from API if `location` object is set
    if (!city || !state) {
      fetchApiData()
        .then(function (response) {
          if (!response.ok) {
            return null;
          }
        })
        .catch(function () {
          return null;
        });
    }
  }, [city, state]);
  return (
    <>
      <HeaderContainer
        opt={{
          bgOne: "transparent",
          bgTwo: "transparent",
          classes: "header-block",
          pageHasMenu: false,
        }}
        // mainMenu={mainMenu}
        hasMenu={false}
        // hasMenu={index?.hasMenu}
        // scheduleLink={index.calendlyLink}
        gtag={"gtag"}
        gtagCounter={gtagCounter}
        pathname={pathname}
      />

      <main className="main-container-wrapper">
        <div className="main-container main-page">
          <div className="news-grid category">
            <BlogList
              posts={arrPosts}
              postsToShow={theme?.postsToShow || 9}
              city={city}
              state={state}
            />
          </div>
        </div>
      </main>
      <FooterContainer />
    </>
  );
};

export default CategoryPage;
