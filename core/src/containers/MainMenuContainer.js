import React from "react";
import MainMenuList from "@/components/MainMenuList";

const MainMenuContainer = ({
  isMobile,
  wrapperRef,
  mainMenuItems,
  refState,
  handleRefState,
  pathname,
}) => {
  const isVisibleClass = !refState ? "visible" : "not-visible";
  const navClasses = isMobile
    ? "main-nav menu-state-" + isVisibleClass
    : "main-nav main-header-" + isVisibleClass;
  const labelledby = isMobile ? "check-toggle-icon" : null;
  return (
    <>
      <div className="overlay menu-overlay" onClick={handleRefState}></div>

      <nav
        className={navClasses}
        ref={wrapperRef}
        id="site-navigation"
        itemScope="itemScope"
        itemType="https://schema.org/SiteNavigationElement"
      >
        <ul
          className="main-ul"
          id="mainmenu"
          role="menu"
          aria-labelledby={labelledby}
        >
          {mainMenuItems?.map((listMobile, indxMobile) => {
            const y = 1 + indxMobile;
            return (
              <MainMenuList
                list={listMobile}
                key={y}
                isMobile={isMobile}
                handleRefState={handleRefState}
                pathname={pathname}
              />
            );
          })}
        </ul>
      </nav>
    </>
  );
};
export default MainMenuContainer;
