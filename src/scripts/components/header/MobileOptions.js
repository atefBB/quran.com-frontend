'use strict';

import React from 'react';
import SearchInput from './SearchInput';
import ReciterDropdown from './ReciterDropdown';
import ContentDropdown from './ContentDropdown';
import Audioplayer from '../audioplayer/Audioplayer';
import SurahsNav from 'components/surah/SurahsNav';
import FontSizeInput from './FontSizeInput';
import ReadingModeToggle from './ReadingModeToggle';

class MobileOptions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readingMode: false,
      infoMode: false,
      chapterSelection: false,
      searchSelection: false,
      contentSelection: false,
      audioSelection: false,
      settingsSelection: false
    };
  }

  readingMode() {
    this.setState({
      readingMode: !this.state.readingMode
    });

    AyatActions.triggerReading();
  }

  setSelection(e, prop) {
    e.preventDefault();

    var defaultState = {
      infoMode: false,
      chapterSelection: false,
      searchSelection: false,
      contentSelection: false,
      audioSelection: false,
      settingsSelection: false
    };

    defaultState[prop] = !this.state[prop];

    this.setState(defaultState);
  }

  chapterSelection(e) {
    this.setSelection(e, 'chapterSelection');
  }

  searchSelection(e) {
    this.setSelection(e, 'searchSelection');
  }

  audioSelection(e) {
    this.setSelection(e, 'audioSelection');
  }

  contentSelection(e) {
    console.log('jasdhkjashdkjashdk')
    this.setSelection(e, 'contentSelection');
  }

  settingsSelection(e) {
    this.setSelection(e, 'settingsSelection');
  }

  renderSelection() {
    if (this.state.chapterSelection) {
      return (
        <div className="row">
          <SurahsNav />
        </div>
      );
    } else if (this.state.searchSelection) {
      return (
        <div className="row">
          <SearchInput className="col-md-2 col-xs-12 search-input" />
        </div>
      );
    }
  }

  renderBottomSelection() {
    var selection;
    if (this.state.audioSelection) {
      selection = (
        <div className="row text-center">
          <Audioplayer />
          <ReciterDropdown />
        </div>
      );
    }
    else if (this.state.settingsSelection) {
      selection = (
        <div className="row options">
          <div className="col-xs-9 full-height">
            <FontSizeInput />
          </div>
          <div className="col-xs-3 full-height text-center">
            <ReadingModeToggle noPullRight={true} />
          </div>
        </div>
      );

    }
    else if (this.state.contentSelection) {
      selection = (
        <div className="row text-center">
          <ContentDropdown />;
        </div>
      );
    }

    return selection;
  }

  render() {
    return (
      <div className="mobile navbar-bottom visible-xs col-xs-12">
        <div className="row dark-bg">
          <div className="toggle-options col-xs-9">
            <a onClick={this.chapterSelection.bind(this)}>
              Chapter / Surah&nbsp;<i className={'ss-icon pull-right ' + (this.state.chapterSelection ? 'ss-directup' : 'ss-dropdown' )} />
          </a>
        </div>
        <div className={'toggle-options col-xs-3 text-center ' + (this.state.searchSelection ? 'active' : '')}>
          <a onClick={this.searchSelection.bind(this)}>
            <i className="ss-icon ss-search"></i>
          </a>
        </div>
      </div>
      {this.renderSelection()}
      <div className="row options text-center">
        <ul className="col-xs-12">
          <li>
            <a className="nav-link">
              <i className="ss-icon ss-info" />
            </a>
          </li>
          <li>
            <a onClick={this.audioSelection.bind(this)}>
              <i className="ss-icon ss-play" />
              <i className="ss-icon ss-pause" />
            </a>
          </li>
          <li>
            <a onClick={this.contentSelection.bind(this)}>
              <i className="ss-icon ss-globe" />
            </a>
          </li>
          <li>
            <a onClick={this.settingsSelection.bind(this)}>
              <i className="ss-icon ss-settings" />
            </a>
          </li>
        </ul>
      </div>
      {this.renderBottomSelection()}
    </div>
  );
}
}

MobileOptions.displayName = 'MobileOptions';


export default MobileOptions;
