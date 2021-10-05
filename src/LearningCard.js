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
    // this is the base path to the assets calculated at run time
    // this ensures that assets are shipped correctly when building the demo
    // on github pages, or when people reuse assets outside your elements in production
    // because this won't change we can leverage as an internal variable without being
    // declared in properties. This let's us ship the icons while referencing them correctly
    this.assetPaths = {
      beaker: new URL('../assets/beaker.svg', import.meta.url).href,
      lightbulb: new URL('../assets/lightbulb.svg', import.meta.url).href,
      question: new URL('../assets/question.svg', import.meta.url).href
    };
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
      <div class="slot-wrapper" data-label="Header" data-layout-slotname="header">
        <slot name="header"></slot>
      </div>
      <img part="icon" src="${this.assetPaths.beaker}" alt=""/>
      <img part="icon" src="${this.assetPaths.lightbulb}"/>
      <img part="icon" src="${this.assetPaths.question}" alt=""/>
      <div class="slot-wrapper" data-label="Content" data-layout-slotname="content">
        <slot name="content"></slot>
        <slot></slot>
      </div>
    </div>
    `;
  }
  // HAX specific callback
  // This teaches HAX how to edit and work with your web component
  /**
   * haxProperties integration via file reference
   */
   static get haxProperties() {
    return {
      canScale: false,
      canPosition: false,
      canEditSource: true,
      contentEditable: true,
      gizmo: {
        title: "Learning Card",
        description: "An element that you have to replace / fix / improve",
        icon: "credit-card",
        color: "blue",
        groups: ["Content", "Presentation", "Education"],
      },
      settings: {
        configure: [
          {
            property: "type",
            title: "Type",
            description: "Identifies the card",
            inputMethod: "select",
            options: {
              science: "Science",
              math: "Math",
            }
          },
        ],
        advanced: [
        ],
      },
      demoSchema: [
        {
          tag: LearningCard.tag,
          properties: {
            type: "science"
          },
          content: "<p slot='header'>This tag renders in the header</p><ul><li>This renders</li><li>Below the tag</li></ul>"
        }
      ]
    };
  }
}
