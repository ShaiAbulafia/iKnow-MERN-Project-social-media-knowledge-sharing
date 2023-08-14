import { useState, useCallback, useMemo, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";

import {
  createPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
  ratePost,
  favPost,
  getUserPosts,
} from "../services/postApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../users/providers/UserProvider";
import normalizePost from "../helpers/normalization/normalizePost";

const usePosts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState();
  const [post, setPost] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilter] = useState(null);
  const [searchParamas] = useSearchParams();

  useAxios();
  const snack = useSnack();
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchParamas.get("p") ?? "");
  }, [searchParamas]);

  useEffect(() => {
    if (posts) {
      setFilter(
        posts.filter(
          (post) =>
            post.title.includes(query) ||
            post.subtitle.includes(query) ||
            post.tags.find((tag) => tag.includes(query))
        )
      );
    }
  }, [posts, query]);

  const requestStatus = useCallback(
    (loading, errorMessages, posts, post = null) => {
      setLoading(loading);
      setError(errorMessages);
      setPosts(posts);
      setPost(post);
    },
    []
  );

  const handleGetPosts = useCallback(async () => {
    try {
      setLoading(true);
      const posts = await getPosts();
      requestStatus(false, null, posts);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [requestStatus]);

  const handleGetUserPosts = useCallback(
    async (userId) => {
      try {
        setLoading(true);
        const posts = await getUserPosts(userId);
        requestStatus(false, null, posts);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
  );

  const handleGetPost = useCallback(
    async (postId) => {
      try {
        setLoading(true);
        const post = await getPost(postId);
        requestStatus(false, null, null, post);
        return post;
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
  );

  const handleGetFavPosts = useCallback(async () => {
    try {
      setLoading(true);
      const posts = await getPosts();
      const favPosts = await posts.filter(
        (post) => !!post.favorites.find((id) => id === user._id)
      );
      requestStatus(false, null, favPosts);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, [requestStatus]);

  const handleCreatePost = useCallback(
    async (postFromClient) => {
      try {
        setLoading(true);
        const normalizedPost = normalizePost(postFromClient);
        const post = await createPost(normalizedPost);
        snack("success", "Created post successfully");
        navigate(`${ROUTES.POSTS}/my_posts`);
        requestStatus(false, null, null, post);
      } catch (error) {
        requestStatus(false, error, null, null);
      }
    },
    [navigate, requestStatus, snack]
  );

  const handleUpdatePost = useCallback(
    async (postId, normalizedPost) => {
      try {
        setLoading(true);
        const post = await editPost(postId, normalizedPost);
        requestStatus(false, null, null, post);
        snack("success", "Updated post successfully");
        navigate(`${ROUTES.POSTS}/${post._id}`);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [navigate, requestStatus, snack]
  );

  const handleDeletePost = useCallback(
    async (postId) => {
      try {
        setLoading(true);
        await deletePost(postId);
        snack("success", "Deleted post successfully");
        requestStatus(false, null, null);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus, snack]
  );

  const handleFavPost = useCallback(
    async (postId) => {
      try {
        setLoading(true);
        const post = await favPost(postId);
        const posts = await getPosts();
        requestStatus(false, null, posts, post);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
  );

  const handleRatePost = useCallback(
    async (postId, userRate) => {
      try {
        setLoading(true);
        const post = await ratePost(postId, userRate);
        requestStatus(false, null, null, post);
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus]
  );

  const valuePost = useMemo(() => {
    return {
      isLoading,
      error,
      posts,
      post,
      filteredPosts,
    };
  }, [isLoading, error, posts, post, filteredPosts]);

  return {
    valuePost,
    handleCreatePost,
    handleDeletePost,
    handleGetPost,
    handleGetPosts,
    handleFavPost,
    handleUpdatePost,
    handleGetFavPosts,
    handleRatePost,
    handleGetUserPosts,
  };
};

export default usePosts;
