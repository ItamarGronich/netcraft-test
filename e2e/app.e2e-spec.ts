import { NetcraftTestPage } from './app.po';

describe('netcraft-test App', () => {
  let page: NetcraftTestPage;

  beforeEach(() => {
    page = new NetcraftTestPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
