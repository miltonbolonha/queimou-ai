import React, { useState } from "react";

import Post from "@/components/Post";

const BlogList = ({ posts, postsToShow, city, state }) => {
  // const sortedPosts = posts.sort((post1, post2) =>
  //   new Date(post1.date) > new Date(post2.date) ? -1 : 1
  // );

  const [count] = useState({
    prev: 0,
    next: 10,
  });
  const [current] = useState(posts.slice(count.prev, count.next));
  return (
    <>
      {current?.map((post, i) => {
        if (i >= postsToShow) {
          return null;
        }
        if (!post?.frontmatter) return null;

        if (
          !post?.frontmatter?.categories ||
          post?.frontmatter?.categories[0] === "Hide"
        ) {
          return null;
        }
        const x = i + 1;
        let title = post?.frontmatter?.title.replace("{{city}}", city);
        title = title.replace("{{state}}", state);
        const alt = `Link with highlight image, to access post: ${
          title.length > 20 ? title.substring(0, 20) : title
        }`;
        const e = post?.frontmatter?.image.split("/image/upload/");
        // const sizes = x === 1 ? ["w_529", "h_529"] : ["w_259", "h_192"];
        const highlightImage = post?.frontmatter?.image.includes("cloudinary")
          ? e[0] + `/q_65/w_724,f_auto/` + e[1]
          : post?.frontmatter?.image;

        return (
          <Post
            key={x}
            number={x}
            slug={post?.slug || "/"}
            title={title}
            alt={alt}
            image={highlightImage}
            date={post?.frontmatter?.date}
            description={post?.frontmatter?.description}
            category={
              post?.frontmatter?.categories[0] || post?.frontmatter?.categories
            }
          />
        );
      })}
    </>
  );
};

export default BlogList;
