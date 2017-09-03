import React, { Component } from 'react';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
} = ShareButtons;


const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const RedditIcon = generateShareIcon('reddit');
const EmailIcon = generateShareIcon('email');


class ShareButtonRow extends Component {
  render() {
    const title = '<BlckBx.io /> Your scripts, anywhere.';
    return(
      <div className={"flex-row mbm " + this.props.className}>
        <FacebookShareButton
          url={this.props.url}
          quote={title}
          className="share-button outline-none">
          <FacebookIcon
            size={32}
            round />
        </FacebookShareButton>
        <TwitterShareButton
            url={this.props.url}
            title={title}
            className="share-button outline-none mlm">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
        <RedditShareButton
          url={this.props.url}
          title={title}
          className="share-button outline-none mlm">
          <RedditIcon
            size={32}
            round />
        </RedditShareButton>
        <EmailShareButton
          url={this.props.url}
          subject={'<BlckBx.io />'}
          body="<BlckBx.io /> Your scripts, anywhere."
          className="share-button outline-none mlm">
          <EmailIcon
            size={32}
            round />
        </EmailShareButton>
      </div>
    );
  }
}

export default ShareButtonRow;
