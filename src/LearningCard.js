// dependencies / things imported
import { LitElement, html, css } from 'lit';

// EXPORT (so make available to other documents that reference this file) a class, that extends LitElement
// which has the magic life-cycles and developer experience below added
export class LearningCard extends LitElement {
  // a convention I enjoy so you can change the tag name in 1 place
  static get tag() {
    return "learning-card";
  }
  // HTMLElement life-cycle, built in; use this for setting defaults
  constructor() {
    super();
    this.myIcon = null;
    this.type = 'math';
  }
  // properties that you wish to use as data in HTML, CSS, and the updated life-cycle
  static get properties() {
    return {
      // reflect allows state changes to the element's property to be leveraged in CSS selectors
      type: { type: String, reflect: true },
      // attribute helps us bind the JS spec for variables names to the HTML spec
      // <learning-card my-icon="whatever" will set this.myIcon to "whatever"
      myIcon: { type: String, attribute: "my-icon" },
    };
  }
  // updated fires every time a property defined above changes
  // this allows you to react to variables changing and use javascript to perform logic
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "type" && this[propName] === "science") {
        this.myIcon = "beaker";
      }
    });
  }
  // Lit life-cycle; this fires the 1st time the element is rendered on the screen
  // this is a sign it is safe to make calls to this.shadowRoot
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
  }
  // HTMLElement life-cycle, element has been connected to the page / added or moved
  // this fires EVERY time the element is moved
  connectedCallback() {
    super.connectedCallback();
  }
  // HTMLElement life-cycle, element has been removed from the page OR moved
  // this fires every time the element moves
  disconnectedCallback() {
    super.disconnectedCallback();
  }
  // CSS - specific to Lit
  static get styles() {
    return css`
      :host {
        display: block;
      }
      /* this is how you match something on the tag itself like <learning-card type="math"> and then style the img inside */
      :host([type="math"]) img{
        background-color: purple;
      }
      img {
        display: inline-flex;
        height: var(--learning-card-height, 100px);
        width: var(--learning-card-width, 100px);
        background-color: green;
      }
    `;
  }
  // HTML - specific to Lit
  render() {
    return html`
    <h1>cool</h1>
    <div>${this.type}</div>
      <div>
        <slot name="header"></slot>
        <img part="icon" src="../assets/beaker.svg" alt=""/>
        <img part="icon" src="../assets/lightbulb.svg"/>
        <img part="icon" src="../assets/question.svg" alt=""/>
        <slot></slot>
      </div>
    `;
  }
}
