# GitObserve

[GitObserve](https://apaunchev.github.io/gitobserve/) is a GitHub app for tracking open pull requests across your [watched repositories](http://github.com/watching). It was born out of necessity to keep up with pending work within a software development team.

To use it you will need a personal access token from GitHub:
1. Go to [Personal access tokens](https://github.com/settings/tokens) and click __Generate new token__.
2. Enter a description, select the <code>repo</code> scope, then click __Generate token__.
3. Enter the token in the app settings

## Technologies

- [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- [GitHub GraphQL API](https://developer.github.com/v4/)
- [Primer](https://primer.style/)

Inspired by [GitHunt](https://github.com/kamranahmedse/githunt) and [Trailer](https://github.com/ptsochantaris/trailer).
