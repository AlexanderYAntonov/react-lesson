import React from 'react';
import './App.css';
import {Add} from './components/Add';
import {News} from './components/News';
//import myNews from './public/data/newsData' ;

class App extends React.Component {
    state = {
        //news: myNews
        news: null,
        isLoading: false
    }

    handleAddNews = (data) => {
        // сначала мы формируем массив, на основе
        // всего того, что уже было в новостях
        // и кладем это все в новый массив +
        // новую новость кладем в начало массива
        const nextNews = [data, ...this.state.news];
        // затем обновляем новый массив новостей в this.state.news
        this.setState({ news: nextNews });
    }

    componentDidMount() {
        this.setState({isLoading:true});
        fetch("http://localhost:3000/data/newsData.json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                setTimeout( () => {
                    this.setState({news:data, isLoading:false})
                    }, 3000);
                }
                );
    }
    
    render () {
        const {news, isLoading} = this.state;
        return (<React.Fragment>
                <Add onAddNews={this.handleAddNews}/>
                <h3>Новости</h3>
                {isLoading && <p>Загружаю...</p>}
                {Array.isArray(news) && <News someNews={news} />}
                </React.Fragment>);
    }
}

export default App;
