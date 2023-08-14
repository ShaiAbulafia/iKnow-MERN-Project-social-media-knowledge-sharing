import React, { useEffect, useState } from "react";
import { func } from "prop-types";
import CommentForm from "../CommentForm";
import useForm from "../../../../forms/hooks/useForm";
import commentType from "../../../models/types/commentType";
import useComments from "../../../hooks/useComments";
import commentSchema from "../../../models/joi-schemas/commentSchema";
import { Grid } from "@mui/material";

const EditComment = ({ comment, refComments, setEdit }) => {
  const { handleUpdateComment } = useComments();

  const { value, ...rest } = useForm({ text: "" }, commentSchema, async () => {
    await handleUpdateComment(comment._id, value.data.text);
    setEdit(false);
    refComments();
  });

  useEffect(() => {
    rest.setData({ text: comment.text });
  }, []);

  return (
    <Grid container sx={{ my: 5 }}>
      <Grid item xs={12}>
        <CommentForm
          data={value.data}
          errors={value.errors}
          onFormChange={rest.validateForm}
          onInputChange={rest.handleChange}
          onReset={rest.handleReset}
          onSubmit={rest.onSubmit}
        />
      </Grid>
    </Grid>
  );
};

EditComment.propTypes = {
  comment: commentType.isRequired,
  refComments: func.isRequired,
  setEdit: func.isRequired,
};

export default EditComment;
