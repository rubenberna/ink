import { spawnSync } from 'child_process';

const repoUrl = 'https://github.com/rubenberna/data-tool-template'

function run(cmd, args) {
  return spawnSync(cmd, args, { stdio: 'inherit' });
}

function clone(dest) {
  const cmd = run('git', ['clone', '--depth=1', repoUrl, dest]);

  if (cmd.status == 0) {
    run('rm', ['-rf', `${dest}/.git`]);
  }
}

export { clone }