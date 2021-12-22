import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Popover, List, Comment } from 'antd';
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
  HeartTwoTone,
} from '@ant-design/icons';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardcontent';
import { REMOVE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector(state => state.post);
  const [liked, setLiked] = useState(false);
  const [commentFormOpned, setCommentFormOpned] = useState(false);

  const id = useSelector(state => state.user.me?.id);

  const onToggleLike = useCallback(() => {
    setLiked(prev => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpned(prev => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />,
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpned && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={item => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
