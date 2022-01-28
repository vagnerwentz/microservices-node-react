interface Comments {
  id: string;
  content: string;
}

function ListComment(props: { comments: Comments[] }) {
		const renderedComments = props.comments?.map((comment) => {
			return (
				<li key={comment.id}>
					{comment.content}
				</li>
			)
		})

    return (
      <ul>
        {renderedComments}
      </ul>
    )
}

export { ListComment };