const {
  awscdk,
  Gitpod,
  DevEnvironmentDockerImage,
  JsonFile,
} = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Chris Yang',
  authorAddress: 'kimisme9386@gmail.com',
  cdkVersion: '2.1.0',
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  releaseBranches: {
    cdkv1: { npmDistTag: 'cdkv1', majorVersion: 1 },
  },
  workflowNodeVersion: '14.17.0',
  name: 'cdk-lambda-alias-retention',
  repositoryUrl: 'https://github.com/kimisme9386/cdk-lambda-alias-retention.git',
  keywords: [
    'lambda',
    'alias',
    'retention',
  ],
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['kimisme9386-bot'],
  },
  catalog: {
    twitter: 'ChrisYang9386',
    announce: false,
  },
  workflowNodeVersion: '14.17.0',
  python: {
    distName: 'cdk-lambda-alias-retention',
    module: 'cdk_lambda_alias_retention',
  },
});

new JsonFile(project, 'cdk.json', {
  obj: {
    app: 'npx ts-node --prefer-ts-exts src/integ.default.ts',
  },
});

const gitpodPrebuild = project.addTask('gitpod:prebuild', {
  description: 'Prebuild setup for Gitpod',
});
// install and compile only, do not test or package.
gitpodPrebuild.exec('yarn install --frozen-lockfile --check-files');
gitpodPrebuild.exec('npx projen compile');

let gitpod = new Gitpod(project, {
  dockerImage: DevEnvironmentDockerImage.fromFile('.gitpod.Dockerfile'),
  prebuilds: {
    addCheck: true,
    addBadge: true,
    addLabel: true,
    branches: true,
    pullRequests: true,
    pullRequestsFromForks: true,
  },
});

gitpod.addCustomTask({
  name: 'install package and check zsh and zsh plugin',
  init: `yarn gitpod:prebuild
sudo chmod +x ./.gitpod/oh-my-zsh.sh && ./.gitpod/oh-my-zsh.sh`,
  command: 'npx projen upgrade',
});

gitpod.addCustomTask({
  name: 'change default shell to zsh and start zsh shell',
  command: 'sudo chsh -s $(which zsh) && zsh',
});

gitpod.addVscodeExtensions(
  'dbaeumer.vscode-eslint',
  'ms-azuretools.vscode-docker',
  'AmazonWebServices.aws-toolkit-vscode',
);

const git_common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
const npm_common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log', 'lambda'];
project.npmignore.exclude(...npm_common_exclude);
project.gitignore.exclude(...git_common_exclude);

project.synth();
