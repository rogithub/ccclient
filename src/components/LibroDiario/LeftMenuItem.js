import React, { Component } from 'react';

class LeftMenuItem extends Component {

  render() {

    return(
      <li className="nav-item">
        <a className="nav-link active" href={this.props.url}>
          <i className={this.props.icon}></i>
          &nbsp;{this.props.text}
          {this.props.isSelected === true &&
            <span className="sr-only">(current)</span>
          }
        </a>
      </li>
    );
  }
}

export default LeftMenuItem;
