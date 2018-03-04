"use strict";
import { LitElement, html } from "../@polymer/lit-element/lit-element.js";
import { repeat } from "../lit-html/lib/repeat.js";
import "../@polymer/paper-item/paper-item.js";
import "../ht-toolbar-cart/ht-toolbar-cart.js";
import "../ht-toolbar-balance/ht-toolbar-balance.js";
import "../@polymer/paper-styles/default-theme.js";

class HTElementsToolbarSigninMenu extends LitElement {
  render({
    photoURL,
    displayName,
    balance,
    email,
    smallScreen,
    isAuthor,
    menu,
    cartQuantity
  }) {
    return html`
      <style>
        :host {
            display: block;
            position: relative;
            box-sizing: border-box;
        }

        a {
            text-decoration: none;
            color: inherit;
            outline: none;
        }

        img {
          display: block;
          width: 64px;
          height:64px;
          border-radius:50%;
          margin-right:16px;
        }

        #container {
          display:flex;
          flex-direction: column;
          background:#fff;
          width:270px;
          overflow:hidden;
          position:relative;
        }

        .divider {
          height: 1px;
          background:#dedede;
        }

        #info {
          display: flex;
          max-width:100%;
          width: 100%;
          box-sizing:border-box;
          align-items:center;
          padding: 16px 16px 8px 16px;
          text-overflow: ellipsis;
          overflow:hidden;
          position:relative;
        }

        #user {
          width:100%;
          max-width: calc(100% - 80px);
        }

        #name {
          font-size: 14px;
          max-height:42px;
          font-weight:500;
        }

        #provider {
          font-size: 13px;
          color: var(--secondary-text-color);
        }

        #name, #provider {
          overflow:hidden;
          text-overflow: ellipsis;
        }

        #cart-and-balance {
          display: flex;
          align-items: center;
          padding: 8px 0;
        }

        ht-toolbar-cart {
          margin-right:16px;
        }

        #header {
          font-size: 14px;
          font-weight: 500;
          padding: 16px 0 8px 16px;
        }

        paper-item {
          font-size:13px;
          cursor: pointer;
          min-height:38px;
        }

        paper-item:hover {
          background: #f0f0f0;
        }

        [hidden] {
          display: none;
        }
      </style>
      <div id="container">
        <div id="info">
          <img src="${photoURL}" alt="">
          <div id="user">
            <div id="name">${displayName}</div>
            <div id="provider">${email}</div>
            <div id="cart-and-balance">
              <ht-toolbar-cart href="/cart" quantity$=${cartQuantity} hidden?=${!smallScreen}></ht-toolbar-cart>
              <ht-toolbar-balance href="/balance" balance$=${balance}></ht-toolbar-balance>
            </div>
          </div>
        </div>

        <div id="account">
          <div class="divider"></div>
          
          ${repeat(
            menu.account,
            i => html`
            <a href="${i.href}"><paper-item>${i.title}</paper-item></a>
          `
          )}

          <div class="divider"></div>
        </div>

        <div id="author" hidden?="${!isAuthor}">
          <div id="header">Настройки автора</div>

           ${repeat(
             menu.author,
             i => html`
            <a href="${i.href}"><paper-item>${i.title}</paper-item></a>
          `
           )}

          <div class="divider"></div>
        </div>
        
        <paper-item id="signout" on-click="${e => {
          e.preventDefault();
          this.signOut();
        }}">Выйти</paper-item>

      </div>
`;
  }

  static get is() {
    return "ht-elements-toolbar-signin-menu";
  }

  static get properties() {
    return {
      photoURL: String,
      displayName: String,
      balance: Number,
      email: String,
      smallScreen: Boolean,
      isAuthor: Boolean,
      menu: Object,
      cartQuantity: Number
    };
  }

  constructor() {
    super();
    this.menu = {
      account: [
        { href: "/", title: "Мой профайл" },
        { href: "/", title: "Платежи" },
        { href: "/", title: "Мои покупки" },
        { href: "/", title: "Избранное" },
        { href: "/", title: "Коллекции" }
      ],
      author: [
        { href: "/", title: "Добавить продукт" },
        { href: "/", title: "Мои продукты" },
        { href: "/", title: "Статистика" }
      ]
    };
  }

  ready() {
    super.ready();
    let elems = this.shadowRoot.querySelectorAll(
      "a, ht-toolbar-cart, ht-toolbar-balance, #signout"
    );
    for (let elem of elems) {
      elem.addEventListener("click", e => {
        e.preventDefault();
        this._closeMenu();
      });
    }
  }

  _closeMenu() {
    this.parentNode.close();
  }

  signOut() {
    this.dispatchEvent(
      new CustomEvent("signout", {
        bubbles: false
      })
    );
  }
}

customElements.define(
  HTElementsToolbarSigninMenu.is,
  HTElementsToolbarSigninMenu
);
