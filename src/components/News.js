import React from 'react';
import PropTypes from 'prop-types';
import {Article} from './Article';

class News extends React.Component {
    state = { // создали состояние
        filteredNews: this.props.someNews,
    }

    componentWillReceiveProps(nextProps) {
        let nextFilteredNews = [...nextProps.someNews];
        
        nextFilteredNews.forEach((item, index) => {
            if (/pubg/.test(item.bigText.toLowerCase())) {
                item.bigText = 'SPAM';
            }
        });
        this.setState({filteredNews: nextFilteredNews});
        
        console.log({ nextProps })
        console.log({ oldProps: this.props })
    }
    
    renderNews = () => {
       const {filteredNews} = this.state;

       let newsTemplate = null;

       if (filteredNews.length){

           newsTemplate = filteredNews.map(function(item) {
               return <Article key={item.id} data={item}/>
           } )

        } else {
            newsTemplate = <p>No news today</p>
        }
        return newsTemplate
    }

    render (){
        const {filteredNews} = this.state;

        return (
            <div>
                {this.renderNews()}
            
                {
                    filteredNews.length?<h3 className='red' onClick={this.handleNewsClick}>Total news: {filteredNews.length}</h3>:null
                }
            </div>
        )
    }


}

News.propTypes = {
        someNews: PropTypes.array.isRequired
}
        
export {News};