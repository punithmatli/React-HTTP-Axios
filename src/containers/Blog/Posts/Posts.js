import React, { Component } from 'react';
import axios from '../../../axios'
import Post from '../../../components/Post/Post'
import './Posts.css'
import {Route} from 'react-router-dom'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
    state= {
        posts:[]
    }

    postSelectedHandler = (id) => {
        // this.props.history.push({pathname:'/'+id});
        this.props.history.push('/posts/'+id);
    }

    componentDidMount () {
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author:'Max'
                }
            })
            this.setState({posts:updatedPosts})
            //console.log("The response",response);
        })
        .catch(error => {
            console.log(error)
            // this.setState({
            //     error:true
            // })
        });
        
    }

    render() {
        let posts = <p style={{textAlign:'center'}}>Something went Wrong!</p>
        if(!this.state.error){
            posts = this.state.posts.map(post => {
                return( 
                //<Link to={'/' + post.id}  >
                    <Post title={post.title} key={post.id} author={post.author} 
                    clicked={() => this.postSelectedHandler(post.id)} />
                    //</Link>
                    )
            })
        }

        return(
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} /> 
            </div>
            
        )

    }
}

export default Posts