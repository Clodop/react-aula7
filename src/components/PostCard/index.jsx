import './styles.css';

export const PostCard = ({post}) => (
    <div className="post" >
        <img src={post.cover} alt={post.title}/>              
        <div className="post-contente">
        <h2>{post.title}</h2>
        <h3>{post.id}</h3>
        <p>{ post.body }</p>
        </div>          
    </div>
);

