import execa from 'execa';
import { clone } from './clone.util';

export class DataToolGenerator {
  constructor(manager, dest, os) {
    this.manager = manager;
    this.dest = dest;
    this.os = os;
  }

  executeCmd(args) {
    return execa(this.manager, args)
  }
  cloneProject() {
    clone(this.dest)
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