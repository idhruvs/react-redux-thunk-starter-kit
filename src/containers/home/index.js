import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepositories } from '../../modules/repositories';

export class Home extends Component {
    state = { username: 'idhruvs' };
    
    componentDidMount() {
        this.updateRepoList( this.state.username );
    }
   
    updateRepoList = username => this.props.fetchRepositories(username);

    render() {
        const isEnabled = this.state.username.length > 0 ? false : true;
        const noUserName = isEnabled ?  (<p> Please enter Username </p>) : (<p></p>)
        const content = this.props.repos.isLoading ? (
            <p> Loading... </p>
        ) :
        (   
            <div>
            <div className="tc">
                <img alt="Avatar" src={this.props.repos.userInfo.avatar_url} className="br-100 h4 w4 dib ba b--black-05 pa2" title="Photo of a kitty staring at you" />
                <h1 className="f3 mb2">{this.props.repos.userInfo.name}</h1>
                <h2 className="f5 fw4 gray mt0">{this.props.repos.userInfo.location}</h2>
            </div>
            <div className="pa3 ph4 bg-washed-green">
                <p className="f4">Repositories ({this.props.repos.list.length})</p>
                <ul className="list f6 pl0 mt3 mb0">
                    {this.props.repos.list.map((repo, index) => (
                        <li className="ph3 pv3 bb b--light-silver" key={index}>
                        <a className="fw7 link underline-hover" href={repo.html_url} target="_blank">
                            {repo.name}
                        </a>
                        </li>
                    ))}
                </ul>
            </div>
            </div>   
        );
        
        return ( 
            <div className="bg-washed-blue pa2 pa4-ns">
                <div className="pa4-l">
                    <div className="bg-lightest-blue mw7 center pa4 br2-ns ba b--black-10">
                        <fieldset className="cf bn ma0 pa0">
                         <div className="cf">
                            <input  type = "text"
                                    value = {this.state.username}
                                    onChange = {ev => this.setState({username: ev.target.value})}
                                    className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="Github Username" 
                                />
                            <button className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                                disabled = {isEnabled}
                                onClick = {() => this.updateRepoList(this.state.username)} >
                                Search
                            </button>
                        </div>
                        </fieldset>
                        { noUserName }
                    </div>
                </div>
                <div className="ba b--black-10 br2 bg-white pa4 mw6 center">
                    <div className="center">
                        { content }
                    </div>
               </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>  ({ repos : state.repos })
const mapDispatchToProps = { fetchRepositories };
const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;    