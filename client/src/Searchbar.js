import React, { Component } from "react"
import "./Homepage.css"
import TrieSearch from "trie-search"
import { withRouter } from "react-router-dom"
import { Redirect } from 'react-router'
import products from './products'

const createTrie = () => {
    const p = new TrieSearch('text')
    p.addAll(products)
    return p
}

class Searchbar extends Component {
    state = {
        searchQuery: '',
        tempQuery: '',
        options: createTrie(),
        suggestions: [],
        activeID: null,
        activeIdx: null,
        toResults: false
    }

    // Update search query and first 10 suggestions
    handleChange = (e) => {
        const { options } = this.state
        const value = e.target.value
        const suggestions = value
            ? options.get(value).slice(0,10)
            : [];
        this.setState({
            searchQuery: value,
            suggestions: suggestions,
            activeID: null,
            activeIdx: null
        })
    }
    // Highlighting logic for the suggestions
    handleKeyDown = e => {
        const { suggestions, activeIdx, searchQuery, tempQuery } = this.state
        const len = suggestions.length
        if (e.currentTarget.value === '' || suggestions.length <= 0) return
        const kc = e.keyCode
        if (kc === 40 || kc === 38) {
            e.preventDefault()
            if (activeIdx === null) {
                if (kc === 40) {
                    this.setState({
                        activeIdx: 0,
                        activeID: suggestions[0].id,
                        searchQuery: suggestions[0].text,
                        tempQuery: searchQuery
                    })
                }
                else {
                    this.setState({
                        activeIdx: len - 1,
                        activeID: suggestions[len - 1].id,
                        searchQuery: suggestions[len - 1].text,
                        tempQuery: searchQuery
                    })
                }
                return
            }
            const diff = kc === 40 ? 1 : -1
            const idx = activeIdx + diff
            if (idx >= len || idx < 0) {
                this.setState({
                    activeIdx: null,
                    activeID: null,
                    searchQuery: tempQuery
                })
            }
            else {
                this.setState({
                    activeIdx: idx,
                    activeID: suggestions[idx].id,
                    searchQuery: suggestions[idx].text
                })
            }
            return
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            toResults: true
        })
    }

    handleClick = (text) => {
        this.setState({
            searchQuery: text,
            toResults: true
        })
    }

    render() {
        const { searchQuery, suggestions, activeID, toResults } = this.state
        if (toResults) return <Redirect to={{
            pathname: "/result",
            search: `q=${this.state.searchQuery}`
        }}/>

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="navigation">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        placeholder="Search..."
                    />
                    <button id="buttons" type="submit">
                        Submit
                    </button>
                    <ul>
                        {suggestions.map(s => {
                            if (s.id === activeID) {
                                return <li className="active" onClick={() => this.handleClick(s.text)} key={s.id}> {s.text} </li>
                            }
                            else {
                                return <li onClick={() => this.handleClick(s.text)} key={s.id}> {s.text} </li>
                            }
                        })
                        }
                    </ul>
                </div>
            </form>
        );
    }
}

export default withRouter(Searchbar)