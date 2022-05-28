import React, { useState } from "react";
import { Button, Card, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getPost } from "../redux/features/PostSlice";
import { postSelector } from "../redux/selector";
import LoadingCard from "./LoadingPost";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector(postSelector);

  const [id, setId] = useState(0);

  const fetchUserPost = () => {
    if (!id) {
      window.alert("Please enter ID !!!");
    } else {
      dispatch(getPost(id));
      setId(null);
    }
  };

  return (
    <div className="container">
      <h1>Fetch Post</h1>
      <Input
        placeholder="Enter User Id"
        type="number"
        onChange={(e) => setId(e.target.value)}
        value={id}
        style={{ width: "300px" }}
      />
      <br />
      <br />
      <Space size="small">
        <Button type="primary" onClick={fetchUserPost}>
          Fetch User Posts
        </Button>
        <Button type="primary" onClick={() => navigate("/create")}>
          Create User Posts
        </Button>
      </Space>

      <br />
      <br />

      {loading ? (
        <LoadingCard count={1} />
      ) : (
        <>
          {posts.length > 0 && (
            <div className="site-cart-border-less-wrapper">
              <Card type="inner" title={posts[0]?.title}>
                <p>User Id: {posts[0]?.id}</p>
                <span>{posts[0].body}</span>
              </Card>
              <Space
                size="middle"
                style={{ marginTop: "35px", marginLeft: "5px", float: "right" }}
              >
                <Button
                  style={{ cursor: "pointer" }}
                  type="primary"
                  danger
                  onClick={() => dispatch(deletePost(posts[0].id))}
                >
                  Delete
                </Button>
                <Button style={{ cursor: "pointer" }} type="primary">
                  Edit
                </Button>
              </Space>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
