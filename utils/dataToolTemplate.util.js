import execa from 'execa';

const repoUrl = process.env.REPO

export class DataToolGenerator {
  constructor(manager, dest) {
    this.manager = manager;
    this.dest = dest;
  }

  executeCmd(file, args) {
    return execa(file, args)
  }

  async cloneProject() {
    const cmd = await execa('git', ['clone', '--quiet', '--depth=1', repoUrl, this.dest])
    if (cmd.status == 0) {
      return execa('rm', ['-rf', `${this.dest}/.git`]);
    }
  }

  installApp() {
    process.chdir(this.dest)
    return this.executeCmd(this.manager, ['install', '--force'])
  }

  installWorkbench(){
    process.chdir('workbench')
    return this.executeCmd(this.manager, ['install', '--force'])
  }
}