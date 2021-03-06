# ember-cli-deploy-github-deployments

> An ember-cli-deploy-plugin for setting the status deploy on a commit in a PR on [GitHub](https://github.com/).

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-s3.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)
[![npm version](https://badge.fury.io/js/ember-cli-deploy-github-deployments.svg)](https://badge.fury.io/js/ember-cli-deploy-github-deployments)

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][2].


## Quick Start

To get up and running quickly, do the following:

- Install this plugin

```bash
$ ember install ember-cli-deploy-github-deployments
```

- Get a github api [token](https://github.com/settings/tokens) make sure the `repo:status` scope is selected

- Place the following configuration into `config/deploy.js`

```javascript
ENV['github-deployments'] = {
  token: '<your-github-token>',
  username: '<user-name>'
  reporname: '<my-ember-app-repo>',
  publicURL: '<url-where-assets-will-be-viewed-from>',
  commit: '<sha-for-specific-commit>'
}
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][2].

- `configure`
- `willDeploy`
- `didDeploy`
- `didFail`

## Required Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][2].

### commit

The github commit sha that the status will be applied to. e.x https://github.com/my-user/:repo/commit/:sha

### token

The [token](https://github.com/settings/tokens) that will be used to set the status on the github commit.

### username

The user or organization that owns the repo. e.x https://github.com/:username/my-repo

### reporname

The user or organization that owns the reporname. e.x https://github.com/my-user/:reporname

### publicURL

The url which your assets are going to be viewed from. e.x. https://my-app-domain.com/{{commit}}

## Screenshot (Pipeline)

### Pending deploy
`ember-cli-deploy-github-deployments` will set the status `pending` of the github commit on the willDeploy.

![screenshot from 2017-08-20 14-08-42](https://user-images.githubusercontent.com/118861/29496839-452f279e-85b1-11e7-9ea0-0c9d608f3043.png)

### Success Deploy
`ember-cli-deploy-github-deployments` will set the status `success` of the github commit on the didDeploy.

![screenshot from 2017-08-20 14-07-10](https://user-images.githubusercontent.com/118861/29496840-452fb4e8-85b1-11e7-9706-4e2f0f8d2863.png)

### Error Deploy
`ember-cli-deploy-github-deployments` will set the status `error` of the github commit on the didFail.

![screenshot from 2017-08-20 14-09-04](https://user-images.githubusercontent.com/118861/29496838-452ec646-85b1-11e7-9319-3769c06155a9.png)

## Roadmap
- [ ] [Save log of deploy in Gist, when failure deploy][4]
- [ ] [Add Github status deployments in timeline][3]

[2]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
[3]: https://developer.github.com/v3/repos/deployments/
[4]: https://developer.github.com/v3/gists/
