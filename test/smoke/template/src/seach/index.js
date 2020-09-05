'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import './seach.less'
import logo from './images/logo.png'
import {commonFunc} from '../../commons/index';
import largeNumber from 'cdl_webpack_large';

class Search extends React.Component {
    constructor() {
        super(...arguments);

        this.state = {
            Text: null
        };
    }

    loadComponent() {
        import('./test.js').then((Text) => {
            this.setState({
                Text: Text.default
            });
        });
    }
    render() {
        const { Text } = this.state;
        const addResult = largeNumber('999', '1');
        return <div className="search-text">
            {
                Text ? <Text /> : null
            }
            {
                addResult
            }
            搜索文字的内容11<img src={ logo } onClick={ this.loadComponent.bind(this) } />
        </div>;
    }
}

ReactDom.render(
    <Search />,
    document.getElementById('root')
)