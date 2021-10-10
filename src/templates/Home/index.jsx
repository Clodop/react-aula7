//import logo from './logo.svg';
//import '../../styles/global-styles.css';
//import { render } from '@testing-library/react';
import './styles.css'

//src\styles\global-styles.css C:\Desenvolvimento WEB\React\aula7\project-1\src\styles\global-styles.css
//só pra exemplificar duas maneiras de import
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

//import React from 'react';
//class App extends React.Component{
class Home extends Component{
  state = {
    name:'Clodoaldo Pereira',
    counter: 0,
    allPosts:[],
    page:0,
    postsPerPage: 2,
    searchValue: '',
    posts:[
      {
        id: 1,
        title: 'O título 01',
        body: 'O  corpo 1'
      },
      {
        id: 2,
        title: 'O título 02',
        body: 'O  corpo dois'
      },
      {
        id: 3,
        title: 'O título 03',
        body: 'O  corpo tres'
      }
    ]
  };

  async componentDidMount(){
    await this.loadPost();
    console.log('loadPost oi...') 
  }


  loadPost = async()=>{
    const{ page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  handleTimeout = () =>{
    const { posts, counter } = this.state;
    posts[0].title = 'O título mudou em: ' + counter.toString()
    this.setState({posts, counter: counter + 1})
    setTimeout(() => {
      this.setState({posts, counter: counter + 1})
      console.log('setTimeOut oi...')  
    }, 3000);    
    console.log('Teste oi...')
  }

  loadMorePosts = () =>{    
    const{
      page,
      postsPerPage,
      allPosts,
      posts
    }=this.state;
    const nextPage= page + postsPerPage;
    const nextPost = allPosts.slice( nextPage, postsPerPage + nextPage );
    posts.push(...nextPost);
    this.setState({ posts, page: nextPage});
    console.log('loadMorePosts oi...',  nextPage, postsPerPage ) ;
  }

  handleChance = (e) =>{
    const { value } = e.target;
    this.setState({ searchValue: value }); 
    console.log(value);
  }

  render(){
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const disabled = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    :
    posts;

    //console.log("Teste render ");
    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1>Procurando por: {searchValue}</h1>
            </>
          )}
          <TextInput searchValue={searchValue} handleChance={this.handleChance} />
        </div>

        {filteredPosts.length > 0 && (
          <Posts  posts = {filteredPosts}  />
        )}
        
        {filteredPosts.length === 0 && (
          <p>Não há posts</p>  
        )}

        <div className="button-container">
          {!searchValue &&(
            <Button 
              text = { "Load More Posts" }
              onClick={ this.loadMorePosts}
              disabled={ disabled }
            />
          )}
        </div>
      </section>
      
    );

  }
}

export default Home;
