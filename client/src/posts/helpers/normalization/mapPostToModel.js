const mapPostToModel = (post) => {
  let sectionObj = {};
  for (let i in post.sections) {
    if (post.sections[i].title !== "") {
      sectionObj = {
        ...sectionObj,
        [`section${Number(i) + 1}_title`]: post.sections[i].title,
        [`section${Number(i) + 1}_text`]: post.sections[i].text,
        [`section${Number(i) + 1}_image_url`]: post.sections[i].image.url,
        [`section${Number(i) + 1}_image_alt`]: post.sections[i].image.alt,
        [`section${Number(i) + 1}_video`]: post.sections[i].video,
      };
    }
  }

  return {
    title: post.title,
    subtitle: post.subtitle,
    tag1: post.tags[0],
    tag2: post.tags[1],
    tag3: post.tags[2],
    tag4: post.tags[3],
    tag5: post.tags[4],
    ...sectionObj,
  };
};

export default mapPostToModel;
