import './global.less';
import $ from 'zepto';
import Flipsnap from 'flipsnap';

class Index {
  constructor() {
    this.example();
    this.initDistanceCard();
  }

  example() {
    console.log('begining')
  }
}

new Index();

module.exports = Index;
