<h4 align="center">This project is deprecated! Badges are now <a href="https://help.github.com/en/articles/configuring-a-workflow#adding-a-workflow-status-badge-to-your-repository">officially part of the GitHub Actions platform</a>!


<h3 align="center">Action Badges</h3>
<p align="center">A README badge service for GitHub Actions<p>
<p align="center"><a href="https://action-badges.now.sh"><img src="https://action-badges.now.sh/JasonEtco/action-badges" /></a> <a href="https://codecov.io/gh/JasonEtco/action-badges/"><img src="https://badgen.now.sh/codecov/c/github/JasonEtco/action-badges" alt="Codecov"></a></p>

## Usage

Get a status badge for all GitHub Action runs on the `master` branch of a repository:

```md
![badge](https://action-badges.now.sh/JasonEtco/example-repo)
```

Specify an action with the `action` query parameter:

```md
![badge](https://action-badges.now.sh/JasonEtco/example-repo?action=test)
```

**Note:** This service only works for public repositories! It cannot read the status of your private repos.

## How it works

When the `/:owner/:repo` endpoint is requested, the app makes a request to the GitHub API to get the list of check suites created by the GitHub Actions app. It then calculates the status based on the sum conclusion of the check suites and responds with some SVG code (thanks to [badgen](https://github.com/amio/badgen)).

