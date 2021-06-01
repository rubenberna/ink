import execa from 'execa';

export async function installVstsAuth() {
  await execa('npm', ['install', '-g', 'vsts-npm-auth', '--registry', 'https://registry.npmjs.com', '--always-auth', 'false'])
}