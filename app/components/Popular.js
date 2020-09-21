import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';
import Card from './Card';
import Loading from './Loading';
import Tooltip from './Tooltip';

function LanguageNav({selected, onUpdateLang}) {
    const languages = ['All', 'Javascript', 'Rubi', 'Java', 'CSS', 'Python'];
    return(
        <ul className="flex-center">
            { languages.map((language) => (
                <li key={language}>
                    <button 
                        style={ selected === language ? {color: 'yellow'} : null }
                        className="btn-clear nav-link" 
                        onClick={() => onUpdateLang(language)}>
                        
                        { language }
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguageNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLang: PropTypes.func.isRequired,
}

function ReposGrid({ repos }) {
    return (
        <ul className="grid space-around">
        { repos.map((repo, index) => {
            const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
            const { login, avatar_url } = owner;

            return(
                <li key={html_url}>
                    <Card
                        header={`#${index+1}`}
                        avatar={avatar_url}
                        href={html_url}
                        name={name}
                    >
                        <ul className="card-list">
                            <li>
                                <Tooltip text="Github username">
                                    <FaUser color='red' size={22}/>
                                    <a href={`https://github.com/${login}`}>
                                        {login}
                                    </a>
                                </Tooltip>
                            </li>
                            <li>
                                <FaStar color='blue' size={22}/>
                                {stargazers_count.toLocaleString()}  stars
                            </li>
                            <li>
                                <FaCodeBranch color='yellow' size={22}/>
                                {forks.toLocaleString()}  forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='gray' size={22}/>
                                {open_issues.toLocaleString()}  open issues
                            </li>
                        </ul>
                    </Card>
                </li>
            )
        })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
    state = {
        selectedLanguage: 'All',
        repos: {},
        error: null
    };
    componentDidMount() {
        this.updateLang(this.state.selectedLanguage);
    }

    updateLang = (selectedLanguage) => {
        this.setState({
            selectedLanguage,
            error: null,
        })

        if(!this.state.repos[selectedLanguage]) {

            fetchPopularRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch(() => {
                    console.warn('Error fetching repos: ', error);
                    
                    this.setState({
                        error: 'There was an error fetching the repositories.'
                    });
                })
        }
    }
        
    isLoading = () => {
        const { selectedLanguage, repos, error } = this.state;

        return repos[selectedLanguage] && error === null;
    }

    render() {
        const {selectedLanguage, repos, error} = this.state;

        return (
            <React.Fragment>
                <LanguageNav 
                    selected={selectedLanguage} 
                    onUpdateLang={this.updateLang}
                />

                {!this.isLoading() && <Loading text={'Fetching Repos'}/> }

                {error && <p>{error}</p>}

                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
            </React.Fragment>
        )
    }
}