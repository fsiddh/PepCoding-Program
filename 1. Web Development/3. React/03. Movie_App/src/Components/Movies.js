import React, { Component } from 'react'
// promisified request api -> url pr request maro isse to info promise k form me ati
import axios from 'axios';

export default class Movies extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            movies:[],
            currSearchText: '',
            limit: 4,
            currPage: 1,
            genres: [{
                _id: "abcd",
                name:'All Genres',
            }],
            cGenre : 'All Genre',
        }
    }
    // ek br chlta render k bad jb ui naya aya ata
    async componentDidMount() {
        console.log('cdm');
                 // request promise deti(get->data mangwa re)
        // url se mangare movies, genres
        let res = await axios.get('https://backend-react-movie.herokuapp.com/movies');
        let genreRes =  await axios.get('https://backend-react-movie.herokuapp.com/genres');
        console.log(res.data.movies);
        this.setState({
            movies: res.data.movies,
            genres: [...this.state.genres, ...genreRes.data.genres]
            // ye render call krdega(state change)
        })
    }
    // ek nayi arr me se vo id hatake use movies:nai arr krdo 
    onDelete=(id)=>{
        let filterArr = this.state.movies.filter(movieObj=>{
            return movieObj._id!=id
        }
        )
        this.setState({
            movies:filterArr
        })
    }
    // para = movies k konse key k acc set krna?
    sortMoviesAsc = (para) => {
        let sortedMovies = [];
        sortedMovies = this.state.movies.sort(
            (a, b) => (a[para] - b[para])
        );
        // sari movies ko sort kia
        this.setState({ movies: sortedMovies}); // sorted movies ko dikha dia
    }
    sortMoviesDesc = (para) => {
        let sortedMovies = [];
        sortedMovies = this.state.movies.sort((a, b) => (b[para] - a[para]));
        this.setState({ movies: sortedMovies });
    }
    // currSearchText = input.value
    handleChange=(e)=>{
        let val = e.target.value;
        this.setState({
            currSearchText:val
        })
    }
    handlePageChange = (pageNo) => {
        this.setState({
            currPage:pageNo,
        })
    }
    handleLimitChange = (e) => {
        let val = e.target.value;
        this.setState({
            limit: parseInt(val),
        })
    }
    handleGenreChange=(name)=> {
        this.setState({
            cGenre: name,
        })
    }
    render() {
        console.log('render');
        let { movies, currSearchText, limit, currPage, cGenre, genres } = this.state;
        let filterMovies = [];

        // search handle
        if (currSearchText != '') {
            filterMovies = movies.filter(movieObj => {
                let title = movieObj.title.trim().toLowerCase();
                // console.log(title);
                return title.includes(currSearchText.toLowerCase());
            })
        }
        else {
            filterMovies = movies;
        }

        // genre handle
        if (cGenre != 'All Genres') {
            filterMovies = filterMovies.filter(function (movie) {
                return movie.genre.name == cGenre;
            })
        } 

        //  page pr kitti movies handle
        let noOfPage = Math.ceil(filterMovies.length / limit);
        let pageNoArr = [];
        for (let i = 0; i < noOfPage; i++) {
            pageNoArr.push(i + 1);
        }
        let si = (currPage - 1) * limit;
        let ei = si + limit;
        console.log(si, ei, limit)
        filterMovies = filterMovies.slice(si, ei);
        
        return (
            // jsx ka code html me {} wrap kro + ek se jyada element h-> <>{}</>
        <>
                {
                    this.state.movies.length == 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    :
                    < div className = 'container' >
                        <div className='row'>
                            
                                {/* page section */}
                            <div className='col-3'>
                                <ul className="list-group">
                                    {
                                        // jsx in {}
                                        genres.map((genreObj) => ( 
                                            // li needs key 
                                            <li onClick={() => this.handleGenreChange(genreObj.name)} key={genreObj._id} className='list-group-item'>
                                                {genreObj.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                                <h5>Current Genre : {cGenre}</h5>
                            </div>
                            
                            {/* search n table section */}
                            <div className='col-9'>
                                <input onChange={this.handleChange} type='text'></input>
                                    
                                <input value={this.state.limit} onChange={this.handleLimitChange} type='number' min='1' max='9'></input>
                                    
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">
                                                <i className="fa fa-sort-asc" aria-hidden="true" onClick={() => this.sortMoviesAsc("numberInStock")}></i>
                                                Stock
                                                <i className="fa fa-sort-desc" aria-hidden="true" onClick={() => this.sortMoviesDesc("numberInStock")}></i>
                                            </th>
                                            <th scope="col">
                                                <i className="fa fa-sort-asc" aria-hidden="true" onClick={() => this.sortMoviesAsc("dailyRentalRate")}></i>
                                                Rate
                                                <i className="fa fa-sort-desc" aria-hidden="true" onClick={() => this.sortMoviesDesc("dailyRentalRate")}></i>
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { // loop always in bracket
                                            // movies table
                                            filterMovies.map(movieObj => ( //normal bracket jb jsx return krre
                                                <tr scope='row' key={movieObj._id} >
                                                    <td>{movieObj.title}</td>
                                                    <td>{movieObj.genre.name}</td>
                                                    <td>{movieObj.numberInStock}</td>
                                                    <td>{movieObj.dailyRentalRate}</td>
                                                    <td><button onClick={() => this.onDelete(movieObj._id)} type="button" className="btn btn-danger">Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        {
                                            pageNoArr.map((pageNo) => {
                                                let classStyle = pageNo == currPage ? 'page-item active' : 'page-item';
                                                return (
                                                    <li key={pageNo} onClick={() => this.handlePageChange(pageNo)} className={classStyle}><span className="page-link">{pageNo}</span></li>
                                                )
                                            })
                                        }
                                            
                                        
                                    </ul>
                                </nav>
                            </div>
                            
                        </div>
                    </div >
                }
        </>
        )
    }
}
