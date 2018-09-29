import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { FormGenerator, Button, TipPanel } from 'ukelli-ui';

let isDev = process.env.NODE_ENV == 'development';
let StoreLoginInfo = 'STORE_LOGIN_INFO';

export default class LoginPanel extends Component {
  constructor(props) {
    super(props);

    let preLoginFormInfo = window.Storage.getItem(StoreLoginInfo) || {};
    try {
      preLoginFormInfo = JSON.parse(preLoginFormInfo);
    } catch(e) {
      preLoginFormInfo = {};
    }

    var defaultUserInfo = {
      AdminName: preLoginFormInfo.AdminName || (isDev ? 'alex' : ''),
      Password: (isDev ? 'qwe123' : '')
    };

    this.formOptions = [
      {
        ref: 'AdminName',
        type: 'input',
        defaultValue: defaultUserInfo.AdminName,
        title: '账号',
        iconName: 'account',
        required: true
      },
      {
        ref: 'Password',
        type: 'password',
        defaultValue: defaultUserInfo.Password,
        title: '密码',
        iconName: 'lock',
        required: true
      },
      {
        ref: 'GooglePassword',
        type: 'input',
        iconName: 'security',
        title: 'Google认证码'
      }
    ];
  }
  componentDidMount() {
    setTimeout(() => {
      // isDev && document.querySelector('#freeLogin').click();
    }, 100);
  }
  render() {
    const { logging, login, loginResDesc } = this.props;

    return (
      <form
        className="login-panel"
        onSubmit={e => {
          e.preventDefault();
          login(this.formHelper.value, (userInfo) => {
            // console.log(userInfo)
            window.Storage.setItem(StoreLoginInfo, userInfo);
          });
        }}>
        <div className="form-layout">
          <h3 className="title">管理系统</h3>
          {
            loginResDesc ? (
              <TipPanel text={loginResDesc}/>
            ) : null
          }
          <FormGenerator
            className="login-form-container"
            // inlineTitle={true}
            showInputTitle
            formOptions={this.formOptions} ref={e => this.formHelper = e}>
            <div className="form-group">
              <button type="submit" className="btn theme flat login-btn" id="freeLogin">
                {logging ? '登录中...' : '登录'}
              </button>
            </div>
          </FormGenerator>
        </div>
      </form>
    );
  }
}
