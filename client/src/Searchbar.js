import React, { Component } from "react";
import "./Homepage.css";
import TrieSearch from "trie-search";
import faker from "faker";
import { withRouter } from "react-router-dom";

// Use fake products for now
const generateFakeProducts = () => {
    let count = 100
    const products = new TrieSearch('text')
    while (count--) {
        products.add({ id: count, text: faker.commerce.productName() })
    }
    return products
}

class Searchbar extends Component {
    state = {
        searchQuery: '',
        tempQuery: '',
        options: generateFakeProducts(),
        suggestions: [],
        activeID: null,
        activeIdx: null
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
        alert(`submitted: ${this.state.searchQuery}`)
    }

    handleClick = (text) => {
        this.setState({
            searchQuery: text
        })
    }

    render() {
        const { searchQuery, suggestions, activeID } = this.state
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