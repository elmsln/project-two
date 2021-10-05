import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/app.js';

describe('LearningCard', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<learning-card></learning-card>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot.querySelector('div');
    expect(div).to.exist;
    expect(div.textContent).to.equal('cool');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
