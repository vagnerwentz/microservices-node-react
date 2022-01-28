interface Comments {
  id: string;
  content: string;
  status: 'approved' | 'pending' | 'rejected';
}

function ListComment(props: { comments: Comments[] }) {
  const renderedComments = props.comments?.map((comment) => {
    let content;

    if (comment.status === 'approved') {
      content = comment.content;
    } else if (comment.status === 'pending') {
      content = 'This commet is awaiting moderation';
    } else {
      content = 'This comment has been reject';
    }

    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
}

export { ListComment };
