"use strict";
import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/iron-iconset-svg/iron-iconset-svg.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-item/paper-icon-item.js";
import "@polymer/paper-styles/default-theme.js";
import "@polymer/paper-button/paper-button.js";
import "@01ht/ht-toolbar-cart";
import "@01ht/ht-toolbar-balance";

import { stylesBasicWebcomponents, stylesUI } from "@01ht/ht-theme/styles";

class HTElementsToolbarSigninMenu extends LitElement {
  static get styles() {
    return [
      stylesBasicWebcomponents,
      stylesUI,
      css`
        a {
          text-decoration: none;
          color: inherit;
          outline: none;
          display: block;
        }

        img {
          display: block;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin-right: 16px;
        }

        iron-icon {
          color: var(--secondary-text-color);
        }

        paper-button {
          font-size: 13px;
          margin-top: 0;
          text-transform: none;
          font-weight: 700;
          line-height: 1rem;
          padding: 0 8px;
          min-height: 30px;
        }

        paper-item iron-icon {
          margin-right: 8px;
        }

        #container {
          display: flex;
          flex-direction: column;
          background: #fff;
          width: 270px;
          overflow: hidden;
          position: relative;
          overflow: auto;
          max-height: calc(100vh - 64px);
        }

        .divider {
          height: 1px;
          background: #dedede;
        }

        #info {
          display: flex;
          max-width: 100%;
          width: 100%;
          box-sizing: border-box;
          align-items: center;
          padding: 16px;
          text-overflow: ellipsis;
          position: relative;
        }

        #user {
          width: 100%;
          max-width: calc(100% - 80px);
        }

        #name {
          font-size: 14px;
          max-height: 42px;
          font-weight: 500;
        }

        #provider {
          font-size: 13px;
          color: var(--secondary-text-color);
        }

        #name,
        #provider {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        #cart-and-balance {
          display: flex;
          align-items: center;
        }

        #cart-and-balance > * {
          padding: 8px 0;
        }

        ht-toolbar-cart {
          margin-right: 16px;
        }

        #header {
          font-size: 14px;
          font-weight: 500;
          padding: 16px 0 8px 16px;
        }

        paper-item {
          font-size: 13px;
          cursor: pointer;
          min-height: 38px;
        }

        paper-item:hover {
          background: #f0f0f0;
        }

        [hidden] {
          display: none;
        }
      `
    ];
  }

  render() {
    const {
      menu,
      avatar,
      isAuthor,
      displayName,
      email,
      smallScreen,
      balance,
      cartQuantity
    } = this;
    return html`
      <iron-iconset-svg size="24" name="ht-elements-toolbar-signin-menu">
      <svg>
        <defs>
            <g id="exit-to-app"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></g>    
        </defs>
      </svg>
    </iron-iconset-svg>
      <div id="container">
        <div id="info">
          ${
            avatar
              ? html`<img src="${
                  window.appConfig.cloudinary.url
                }/c_scale,r_max,f_auto,h_128,w_128/v${avatar.version}/${
                  avatar.public_id
                }.${avatar.format}" alt="${displayName} avatar">`
              : ""
          }
          <div id="user">
            <div id="name">${displayName}</div>
            <div id="provider">${email}</div>
            <div id="cart-and-balance">
              <ht-toolbar-cart .href="${"/cart"}" @click="${_ => {
      this._changePath("/cart");
    }}" @tap="${_ => {
      this._changePath("/cart");
    }}" .quantity="${cartQuantity}" ?hidden="${!smallScreen}"></ht-toolbar-cart>
              <ht-toolbar-balance .href=${"/my-statistics"} ?hidden="${!isAuthor}" .balance="${balance}" @click="${_ => {
      this._changePath("/my-statistics");
    }}" @tap="${_ => {
      this._changePath("/my-statistics");
    }}"></ht-toolbar-balance>
            </div>
            <div id="myaccount">
                <paper-button raised @tap="${_ => {
                  this._changeLocation("https://myaccount.01.ht");
                }}" @click="${_ => {
      this._changeLocation("https://myaccount.01.ht");
    }}">Аккаунт 01HT</paper-button>
            </div>
          </div>
        </div>

        <div id="account">
          <div class="divider"></div>
          
          ${repeat(
            menu.account,
            i => html`
            <paper-item @click="${_ => {
              this._changePath(i.href);
            }}" @tap="${_ => {
              this._changePath(i.href);
            }}">${i.title}</paper-item>
          `
          )}

          <div class="divider"></div>
        </div>

        <div id="author" ?hidden="${!isAuthor}">
          <div id="header">Настройки автора</div>
           ${repeat(
             menu.author,
             i => html`
             ${
               i.divider
                 ? html`<div class="divider"></div>`
                 : html`<paper-item @click="${_ => {
                     this._changePath(i.href);
                   }}" @tap="${_ => {
                     this._changePath(i.href);
                   }}">${i.title}</paper-item>`
             }
          `
           )}
          <div class="divider"></div>
        </div>
        
        <paper-item id="signout" @click="${e => {
          this.signOut();
        }}" @tap="${e => {
      this.signOut();
    }}">
          <iron-icon icon="ht-elements-toolbar-signin-menu:exit-to-app"></iron-icon>
          Выйти
        </paper-item>
      </div>
`;
  }

  static get properties() {
    return {
      avatar: { type: Object },
      displayName: { type: String },
      balance: { type: Number },
      email: { type: String },
      smallScreen: { type: Boolean },
      isAuthor: { type: Boolean },
      menu: { type: Object },
      cartQuantity: { type: Number }
    };
  }

  constructor() {
    super();
    this.menu = {
      account: [
        { href: "/my-licenses", title: "Мои лицензии" },
        { href: "/my-orders", title: "Мои заказы" }
        // { href: "/", title: "Избранное" },
        // { href: "/", title: "Коллекции" }
      ],
      author: [
        { href: "/my-items", title: "Мои элементы" },
        { href: "/my-organizations", title: "Мои организации" },
        { href: "/my-statistics", title: "Моя статистика" },
        { divider: true },
        { href: "/contract", title: "Настройки договора" },
        { href: "/payout", title: "Настройки выплат" }
      ]
    };
  }

  _changeLocation(href) {
    window.location.href = href;
  }

  _changePath(pathname) {
    this.dispatchEvent(
      new CustomEvent("update-pathname", {
        bubbles: true,
        composed: true,
        detail: {
          pathname: pathname
        }
      })
    );
    this._closeMenu();
  }

  _closeMenu() {
    this.parentNode.close();
  }

  signOut() {
    this.dispatchEvent(
      new CustomEvent("on-signout", {
        bubbles: true,
        composed: true
      })
    );
  }
}

customElements.define(
  "ht-elements-toolbar-signin-menu",
  HTElementsToolbarSigninMenu
);
