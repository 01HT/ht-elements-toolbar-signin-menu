"use strict";
import { LitElement, html, css } from "lit-element";
import { repeat } from "lit-html/directives/repeat.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-styles/default-theme.js";
import "@01ht/ht-toolbar-cart";
import "@01ht/ht-toolbar-balance";

import { stylesBasicWebcomponents } from "@01ht/ht-theme/styles";

class HTElementsToolbarSigninMenu extends LitElement {
  static get styles() {
    return [
      stylesBasicWebcomponents,
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

        #container {
          display: flex;
          flex-direction: column;
          background: #fff;
          width: 270px;
          overflow: hidden;
          position: relative;
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
          padding: 16px 16px 8px 16px;
          text-overflow: ellipsis;
          overflow: hidden;
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
      <div id="container">
        <div id="info">
          ${
            avatar
              ? html`<img src="${
                  window.cloudinaryURL
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
           <paper-item @click="${_ => {
             this._changePath(i.href);
           }}" @tap="${_ => {
               this._changePath(i.href);
             }}">${i.title}</paper-item>
          `
           )}
          <div class="divider"></div>
        </div>
        
        <paper-item id="signout" @click="${e => {
          this.signOut();
        }}" @tap="${e => {
      this.signOut();
    }}">Выйти</paper-item>
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
        { href: "/account", title: "Мой аккаунт" },
        { href: "/my-licenses", title: "Мои лицензии" },
        { href: "/my-orders", title: "Мои заказы" }
        // { href: "/", title: "Избранное" },
        // { href: "/", title: "Коллекции" }
      ],
      author: [
        { href: "/my-items", title: "Мои элементы" },
        { href: "/my-organizations", title: "Мои организации" },
        { href: "/my-statistics", title: "Моя статистика" }
      ]
    };
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
