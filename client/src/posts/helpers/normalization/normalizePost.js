const normalizePost = (post) => {
  let tags = [];
  let sections = [];
  for (let i = 1; i <= 5; i++) {
    if (post[`tag${i}`] !== "" && post[`tag${i}`] !== undefined)
      tags.push(post[`tag${i}`]);
  }
  for (let i = 1; i <= 5; i++) {
    if (
      post[`section${i}_title`] !== "" &&
      post[`section${i}_title`] !== undefined
    ) {
      sections.push({
        title: post[`section${i}_title`],
        text: post[`section${i}_text`] || "",
        image: {
          url: post[`section${i}_image_url`],
          alt: post[`section${i}_image_alt`],
        },
        video: post[`section${i}_video`],
      });
    }
  }
  return {
    title: post.title,
    subtitle: post.subtitle,
    tags: tags,
    sections: sections,
  };
};
export default normalizePost;
