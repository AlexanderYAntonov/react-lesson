import React from 'react';
import PropTypes from 'prop-types';

class Add extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            text: '',
            bigText: '',
            isChecked: false
        };
    }

    validate = () => {
        let {author, text, bigText, isChecked} = this.state;
        author = author.trim();
        text = text.trim();
        bigText = bigText.trim();
        return author && text && bigText && isChecked;
    }

    handleChange = (event) => {
        const {id, value} = event.currentTarget;
        this.setState({[id]: value});
    }

    handleCheckChange = (event) => {
        this.setState({isChecked:event.currentTarget.checked});
    }

    showInputValue = (e) => {
        e.preventDefault();
        const {author, text, bigText} = this.state;
        //alert(this.state.author+'\n'+this.state.text);
        const id = new Date().valueOf();
        this.props.onAddNews({author, text, bigText, id})
    }

    render() {
        const {author, text, bigText} = this.state;
        return (
                <form className='add'>
                <input 
                    type='text'
                    id = 'author'
                    className='add__author' 
                    value = {author}
                    onChange = {this.handleChange}
                    placeholder='Введите имя' />
                <textarea 
                    className = 'add__text'
                    id = 'text'
                    value = {text}
                    onChange = {this.handleChange}
                    placeholder='текст новости'>
                </textarea>
                <textarea 
                    className = 'add__bigText'
                    id = 'bigText'
                    value = {bigText}
                    onChange = {this.handleChange}
                    placeholder='extended текст новости'>
                </textarea>
                <label className='add__checkrule'>
                    <input 
                        type='checkbox' 
                        onChange = {this.handleCheckChange}
                        />
                    Я согласен с правилами
                </label>
                <button
                        className='add__btn' 
                        disabled={!this.validate()}
                        onClick={this.showInputValue}>
                        Готово
                    </button>        
            </form>
        )
    }

}

Add.propTypes = {
    onAddNews: PropTypes.func.isRequired, // func используется для проверки передачи fun
}

export {Add};