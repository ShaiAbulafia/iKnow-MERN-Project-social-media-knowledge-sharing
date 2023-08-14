import React from "react";
import useForm from "../../../../forms/hooks/useForm";
import initialCommentForm from "./../../../helpers/initialForms/initialCommentForm";
import commentSchema from "../../../models/joi-schemas/commentSchema";
import useComments from "./../../../hooks/useComments";
import { useUser } from "../../../../users/providers/UserProvider";
import { Grid, Divider } from "@mui/material";
import CommentForm from "../CommentForm";
import { func, string } from "prop-types";

const NewSubcomment = ({ onPost, setSubcomments, setComment, commentId }) => {
  const { handleCreateSubcomment } = useComments();
  const { user } = useUser();

  const { value, ...rest } = useForm(
    initialCommentForm,
    commentSchema,
    async () => {
      setSubcomments(false);
      await handleCreateSubcomment(commentId, { ...value.data });
      setComment(false);
      setSubcomments(true);
    }
  );

  if (!user) return null;

  return (
    <>
      <Grid container sx={{ alignItems: "center", textAlign: "center" }}>
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>
        <Grid item xs={12} sx={{ my: 3, mx: 4 }}>
          <CommentForm
            onSubmit={rest.onSubmit}
            errors={value.errors}
            onFormChange={rest.validateForm}
            onInputChange={rest.handleChange}
            onReset={rest.handleReset}
            data={value.data}
          />
        </Grid>
      </Grid>
    </>
  );
};

NewSubcomment.propTypes = {
  onPost: func.isRequired,
  setSubcomments: func.isRequired,
  setComment: func.isRequired,
  commentId: string.isRequired,
};

export default NewSubcomment;
