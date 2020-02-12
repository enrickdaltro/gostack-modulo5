import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Filter, Page } from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    issuesFilters: [
      { state: 'all', label: 'All', active: true },
      { state: 'open', label: 'Open', active: false },
      { state: 'closed', label: 'Closed', active: false },
    ],
    issuesFilterIndex: 0,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { issuesFilters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: issuesFilters.find(issuesFilter => issuesFilter.active).state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadedIssues = async () => {
    const { match } = this.props;
    const { issuesFilters, issuesFilterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: issuesFilters[issuesFilterIndex].state,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handleFilterChange = async issuesFilterIndex => {
    await this.setState({ issuesFilterIndex });
    this.loadedIssues();
  };

  handlePage = async action => {
    const { page } = this.state;

    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });
    this.loadedIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      issuesFilters,
      issuesFilterIndex,
      page,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <Filter active={issuesFilterIndex}>
            {issuesFilters.map((issuesFilter, index) => (
              <a
                key={issuesFilters.label}
                onClick={() => this.handleFilterChange(index)}
              >
                {issuesFilter.label}
              </a>
            ))}
          </Filter>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Page>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            Anterior
          </button>
          <span>Page:{page}</span>
          <button type="button" onClick={() => this.handlePage('next')}>
            Próxima
          </button>
        </Page>
      </Container>
    );
  }
}
