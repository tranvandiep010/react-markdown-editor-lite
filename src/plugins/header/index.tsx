import DropList from 'components/DropList';
import Icon from 'components/Icon';
import i18n from 'i18n';
import { PluginComponent, PluginProps } from 'plugins/Plugin';
import * as React from 'react';
import HeaderList from './HeaderList';

interface State {
  show: boolean;
}

export default class Header extends PluginComponent<PluginProps, State> {
  name = 'header';

  constructor(props: any) {
    super(props);

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);

    this.state = {
      show: false,
    };
  }

  private show() {
    this.setState({
      show: true,
    });
  }
  private hide() {
    this.setState({
      show: false,
    });
  }

  render() {
    return (
      <span
        className="button button-type-header"
        title={i18n.get('btnHeader')}
        onMouseEnter={this.show}
        onMouseLeave={this.hide}
      >
        <Icon type="icon-header" />
        <DropList
          show={this.state.show}
          onClose={this.hide}
          render={() => <HeaderList onSelectHeader={(header: string) => this.editor.insertMarkdown(header)} />}
        />
      </span>
    );
  }
}
