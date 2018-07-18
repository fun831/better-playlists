import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let defaultStyle = {
  color:  '#fff'
}
let fakeServerData = {
  user: {
    name: 'David',
    playlists: [
      {
        name: 'My favs',
        songs: [
          {name: 'Move along', duration: 136}, 
          {name: 'Miss you', duration: 210}, 
          {name: 'Simple', duration: 178}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Cancion', duration: 321}, 
          {name: 'Musica', duration: 321}, 
          {name: 'Baila', duration: 444}
        ]
      },
      {
        name: 'The Best!',
        songs: [
          {name: 'Sing', duration: 321}, 
          {name: 'Beautiful Day', duration: 321}, 
          {name: 'All The Small Things', duration: 198}
        ]
      },
      {
        name: 'Rainy Day',
        songs: [
          {name: 'Why', duration: 321}, 
          {name: 'Rain Falls', duration: 321}, 
          {name: 'Sunshine', duration: 234}
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    },[])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0) 
    return(
      <div style={{...defaultStyle, width: '40%', display: 'inline-block'}}>
        <h2>{Math.round(totalDuration/60)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img/>
        <input type='text' onKeyUp={(event) => 
        this.props.onTextChange(event.target.value)}/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{...defaultStyle, display: 'inline-block', width: '25%'}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
        {playlist.songs.map(song => 
          <li>{song.name}</li>
        )}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = { 
      serverData: {},
      filterString: ''
    }
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);  
}
  render() {
    return (
      <div className="App">
        {this.state.serverData.user ? 
        <div>
          <h1 style={{...defaultStyle, 'font-size': '54px'}}>  
          {this.state.serverData.user.name}'s Playlists
        </h1>
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
          ).map(playlist =>
            <Playlist playlist={playlist}/>
          )}
        </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
