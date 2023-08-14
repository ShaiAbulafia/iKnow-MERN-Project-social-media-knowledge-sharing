import React from "react";
import useForm from "../../../forms/hooks/useForm";
import initialCommentForm from "./../../helpers/initialForms/initialCommentForm";
import commentSchema from "../../models/joi-schemas/commentSchema";
import useComments from "./../../hooks/useComments";
import { useUser } from "../../../users/providers/UserProvider";
import { Grid, Divider } from "@mui/material";
import CommentForm from "./CommentForm";
import { useParams } from "react-router-dom";
import { func } from "prop-types";

const NewComment = ({ onPost }) => {
  const { id } = useParams();

  const { handleCreateComment } = useComments();
  const { user } = useUser();

  const { value, ...rest } = useForm(
    initialCommentForm,
    commentSchema,
    async () => {
      await handleCreateComment({ ...value.data }, id);
      onPost();
    }
  );

  if (!user) return null;

  return (
    <>
      <Grid container sx={{ my: 3, alignItems: "center", textAlign: "center" }}>
        <Grid item xs={12}>
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

NewComment.propTypes = {
  onPost: func.isRequired,
};

export default NewComment;
