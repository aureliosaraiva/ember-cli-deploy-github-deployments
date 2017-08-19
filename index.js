'use strict';

const GitHubApi = require('github');
const DeployPluginBase = require('ember-cli-deploy-plugin');

module.exports = {
  name: 'ember-cli-deploy-github-deployments',
  createDeployPlugin(options) {
    var DeployPlugin = DeployPluginBase.extend({
      name: options.name,
      requiredConfig: ['publicURL', 'token', 'username', 'reporname', 'commit'],

      willDeploy(context) {
        return this.notifyPullRequestOfDeployPending(context);
      },

      didDeploy(context) {
        return this.notifyPullRequestOfDeploySuccess(context);
      },

      didFail(context) {
        return this.notifyPullRequestOfDeployError(context);
      },

      notifyPullRequestOfDeployError(context) {
        let github = new GitHubApi();

        github.authenticate({
          type: 'oauth',
          token: this.readConfig('token'),
        });

        return new Promise((resolve, reject) => {
          github.repos.createStatus({
            owner: this.readConfig('username'),
            repo: this.readConfig('reporname'),
            sha: this.readConfig('commit'),
            state: 'error',
            description: 'Build failed!',
            context: 'ember-cli-deploy',
          }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      },

      notifyPullRequestOfDeployPending(context) {
        let github = new GitHubApi();

        github.authenticate({
          type: 'oauth',
          token: this.readConfig('token'),
        });

        return new Promise((resolve, reject) => {
          github.repos.createStatus({
            owner: this.readConfig('username'),
            repo: this.readConfig('reporname'),
            sha: this.readConfig('commit'),
            state: 'pending',
            description: 'Building application!',
            context: 'ember-cli-deploy',
          }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      },

      notifyPullRequestOfDeploySuccess(context) {
        let github = new GitHubApi();

        github.authenticate({
          type: 'oauth',
          token: this.readConfig('token'),
        });

        return new Promise((resolve, reject) => {
          github.repos.createStatus({
            owner: this.readConfig('username'),
            repo: this.readConfig('reporname'),
            sha: this.readConfig('commit'),
            state: 'success',
            description: 'Complete build!',
            target_url: this.readConfig('publicURL'),
            context: 'ember-cli-deploy',
          }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      },
    });

    return new DeployPlugin();
  },
};
