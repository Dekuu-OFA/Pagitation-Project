import './App.css';
import { useState , useEffect } from 'react';
import Head from './Header';
import Post from './Post';
import ReactPaginate from 'react-paginate';
import LazyLoad from 'react-lazyload';

const Loading = () => (
  <div className="post loading">
    <h5>Loading</h5>
  </div>
)


function App() {
  const [posts,setPosts] = useState([]);
  const [error, setError] = useState(false);
  
  const [page,setPage] = useState(0);

  const postsPerPage = 10;
  const itemsVisited = page*postsPerPage;

  const displayPosts = posts.slice(itemsVisited, itemsVisited + postsPerPage).map((user)=>{
        return( 
          <LazyLoad key={user.id} height={100} offset={[-100,100]} placeholder={<Loading />}>

          <Post 
            id={user.id}
            title = {user.title}
            body = {user.body}
          />
          </LazyLoad>
        );
      });

  const pageCount = Math.ceil(posts.length/postsPerPage);
  const changePage = ({selected}) => {
    setPage(selected);
  };

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/posts"
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('something went wrong while requesting posts');
      })
      .then((posts) => setPosts(posts))
      .catch((error) => setError(error.message));
  }, []);

  // console.log(posts);

  if (error) return <h1>{error}</h1>;


  return (
    <div className="App">
      <Head />
      {displayPosts}
      <ReactPaginate 
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}

export default App;
