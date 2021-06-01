import execa from 'execa';
import { clone } from './clone.util';

const repoUrl = 'https://github.com/rubenberna/data-tool-template'

export class DataToolGenerator {
  constructor(manager, dest, os) {
    this.manager = manager;
    this.dest = dest;
    this.os = os;
  }

  executeCmd(args) {
    return execa(this.manager, args)
  }
  async cloneProject() {
    // clone(this.dest)
    const cmd = await execa('git', ['clone', '--quiet', '--depth=1', repoUrl, this.dest])
    if (cmd.status == 0) {
      return execa('rm', ['-rf', `${this.dest}/.git`]);
    }
  }
  installVstsAuth() {
    return execa()
  }
  installApp() {
    process.chdir(this.dest)
    return this.executeCmd(this.manager, ['install'])
  }
  installWorkbench(){
    process.chdir('workbench')
    return this.executeCmd(this.manager, ['install'])
  }
}