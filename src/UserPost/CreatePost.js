import { Input, Button, Card, Space } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/PostSlice";
import { postSelector } from "../redux/selector";
import LoadingPost from "./LoadingPost";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, posts, error } = useSelector(postSelector);
  const navigate = useNavigate();

  const [values, setValues] = useState({ title: "", body: "" });
  const [showPost, setShowPost] = useState(false);
  const { title, body } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ ...values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };

  const showPostBlog = () => {
    return (
      <>
        {loading ? (
          <LoadingPost count={1} />
        ) : (
          posts.map((item) => (
            <div className="site-cart-border-less-wrapper">
              <Card type="inner" title={item.title}>
                <p>User Id: {item.id}</p>
                <span>{item.body}</span>
              </Card>
            </div>
          ))
        )}
      </>
    );
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>CreatePost</h2>
        <Input
          placeholder="Enter a title"
          type="text"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={title}
          style={{ width: "400px" }}
        />
        <br />
        <br />

        <Input
          placeholder="Enter a body"
          type="text"
          onChange={(e) => setValues({ ...values, body: e.target.value })}
          value={body}
          style={{ width: "400px" }}
          size="large"
        />

        <br />
        <br />

        <Space style={{ margin: 10 }}>
          <Button type="primary" onClick={() => navigate("/")}>
            Go back
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </Space>
      </form>

      <br />
      <br />

      {showPost && showPostBlog()}
    </>
  );
};

export default CreatePost;
