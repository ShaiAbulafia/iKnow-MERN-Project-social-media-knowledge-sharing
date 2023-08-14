import React, { useEffect, useState } from "react";
import postType from "../../models/types/postType";
import PaperHeader from "./PaperHeader";
import PaperSection from "./PaperSection";
import { Divider, Paper as MuiPaper } from "@mui/material";
import useUsers from "../../../users/hooks/useUsers";
import { func } from "prop-types";
import { useTheme } from "../../../providers/ThemeProvider";
import RateSection from "./RateSection";

const Paper = ({ post, onRate }) => {
  const { isDark } = useTheme();
  const { handleGetUserDisplay } = useUsers();
  const [userDisplay, setUserDisplay] = useState();

  useEffect(() => {
    handleGetUserDisplay(post.userId).then((data) => {
      setUserDisplay(data);
    });
  }, []);

  if (!userDisplay) return null;
  return (
    <>
      <MuiPaper
        elevation={3}
        sx={{
          border: 2,
          borderColor: isDark ? "darkModeColor.main" : "forthColor.main",
          backgroundColor: isDark ? "" : "thirdColor.main",
        }}
        style={{
          padding: 20,
        }}
      >
        <PaperHeader
          title={post.title}
          subtitle={post.subtitle}
          userDisplay={userDisplay}
          postDate={post.createdAt}
        />
        {(() => {
          let sections = [];
          for (let i = 0; i < post.sections.length; i++) {
            sections.push(
              <PaperSection
                key={`${post._id}_section${i}`}
                section={post.sections[i]}
              />
            );
          }
          return sections;
        })()}
        <Divider sx={{ my: 3 }} />
        <RateSection post={post} onRate={onRate} />
      </MuiPaper>
    </>
  );
};

Paper.propTypes = {
  post: postType.isRequired,
  onRate: func.isRequired,
};

export default Paper;
