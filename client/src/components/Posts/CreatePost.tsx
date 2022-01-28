import { FormEvent, useState } from 'react';
import axios from 'axios';

function CreatePost() {
	const [title, setTitle] = useState('');

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		await axios.post('http://localhost:4000/posts', {
			title
		});

		setTitle('');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Title</label>
					<input 
						type="text" 
						className="form-control" 
						value={title} 
						onChange={e => setTitle(e.target.value)} 
					/>
				</div>
				<button className="btn btn-primary" style={{
					marginTop: '10px'
				}}>Submit</button>
			</form>
		</div>
	)    
}

export { CreatePost };