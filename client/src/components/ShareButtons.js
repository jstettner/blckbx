import React, { Component } from 'react';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  RedditShareButton,
  EmailShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');
const OKIcon = generateShareIcon('ok');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');
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
          body="Your scripts, anywhere."
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
