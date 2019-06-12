import PropTypes from 'prop-types';
import React from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import htmlElementAttributes from 'react-html-attributes';
import { debounce, inRange, isNil, pick } from 'lodash';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    if (props.renderSearchButton && !props.onSearch) {
      throw new Error(
        'prop `onSearch` is required when rendering search button'
      );
    }

    this.state = {
      focusedSuggestion: null,
      isFocused: false,
      searchTerm: null,
      value: ''
    };

    this.attributes = pick(props, htmlElementAttributes.input);

    autoBind(
      this,
      'handleChange',
      'handleClick',
      'handleHover',
      'handleKeyDown',
      'handleSelection',
      'search',
      'toggleFocus'
    );

    this.handleDebouncedChange = debounce(
      this.handleDebouncedChange,
      props.delay
    );
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.focus();
    }

    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  setFocusedSuggestion(isScrollingDown) {
    const { focusedSuggestion: current, searchTerm } = this.state;
    const { suggestions } = this.props;
    const last = suggestions.length - 1;
    let next;

    if (isScrollingDown) {
      next = isNil(current) ? 0 : current + 1;
    } else {
      next = isNil(current) ? last : current - 1;
    }

    this.setState({
      focusedSuggestion: inRange(next, 0, suggestions.length) ? next : null,
      value: suggestions[next] || searchTerm
    });
  }

  clearInput() {
    this.setState({
      focusedSuggestion: null,
      searchTerm: null,
      value: ''
    });

    this.input.focus();
    this.props.onClear();
  }

  toggleFocus() {
    this.setState({
      isFocused: !this.state.isFocused
    });
  }

  handleClick(event) {
    if (!this.container.contains(event.target)) {
      this.props.onClear();
    }
  }

  handleDebouncedChange(searchTerm) {
    this.setState({
      searchTerm
    });

    this.props.onChange(searchTerm);
  }

  handleChange(event) {
    const { value } = event.target;
    const searchTerm = value.trim();

    if (!value) {
      this.clearInput();
      return;
    }

    this.setState({
      focusedSuggestion: null,
      value
    });

    if (searchTerm) {
      this.handleDebouncedChange(searchTerm);
    }
  }

  handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
        event.preventDefault();
        this.setFocusedSuggestion(event.key === 'ArrowDown');
        break;

      case 'Backspace':
        this.handleBackspace();
        break;

      // case 'Enter':
      //   this.search();
      //   break;

      case 'Escape':
        this.handleEscape();
        break;
    }
  }

  handleBackspace() {
    this.setState({
      focusedSuggestion: null
    });
  }

  handleEscape() {
    this.setState({
      focusedSuggestion: null,
      searchTerm: ''
    });

    this.input.blur();
    this.props.onClear();
  }

  handleHover(current) {
    this.setState({
      focusedSuggestion: current
    });
  }

  handleSelection(suggestion) {
    this.setState({
      focusedSuggestion: null,
      value: suggestion
    });

    this.props.onClear();

    if (this.props.onSelection) {
      this.props.onSelection(suggestion);
    }
  }

  search() {
      this.props.onClear();
      this.props.onSearch(this.state.value.trim());
      this.setState({
          focusedSuggestion: null,
          searchTerm: null,
          value: ''
      });

  }

  renderClearButton() {
    return (
      <button
        className={this.props.styles.clearButton}
        onClick={this.clearInput}
      />
    );
  }

  renderSearchButton() {
    return (
      <button
        className={this.props.styles.submitButton}
        onClick={this.search}
      >Send message</button>
    );
  }

  renderSuggestions(searchTerm, styles) {
    return (
      <div></div>
    );
  }

  render() {
    const { props, state } = this;
    const { renderSearchButton, styles } = props;

    const renderClearButton = state.value && props.renderClearButton;
    const renderSuggestions = state.value && props.suggestions.length > 0;

    return (
      <div ref={ref => (this.container = ref)}>            
            <textarea
        {...this.attributes}
        style={styles.input}
        type="text"
        ref={ref => (this.input = ref)}
        value={state.value}
        onChange={this.handleChange}
        onFocus={this.toggleFocus}
        onBlur={this.toggleFocus}
        onKeyDown={this.handleKeyDown}
            />
            {this.renderSearchButton()}
        
      </div>
);
  }
}

// SearchBar.propTypes = {
//   autoFocus: PropTypes.bool,
//   delay: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   onChange: PropTypes.func.isRequired,
//   onClear: PropTypes.func.isRequired,
//   onSearch: PropTypes.func,
//   onSelection: PropTypes.func,
//   renderClearButton: PropTypes.bool,
//   renderSearchButton: PropTypes.bool,
//   styles: PropTypes.object,
//   suggestions: PropTypes.array.isRequired,
//   suggestionRenderer: PropTypes.func
// };
;
// SearchBar.defaultProps = {
//   autoCapitalize: 'off',
//   autoComplete: 'off',
//   autoCorrect: 'off',
//   autoFocus: false,
//   delay: 0,
//   maxLength: 100,
//   placeholder: '',
//   renderClearButton: false,
//   renderSearchButton: false,
//   styles: {
//     wrapper: 'react-search-bar__wrapper',
//     field: 'react-search-bar__field',
//     focusedField: 'react-search-bar__field--focused',
//     hasSuggestions: 'react-search-bar__field--has-suggestions',
//     input: 'react-search-bar__input',
//     clearButton: 'react-search-bar__clear',
//     submitButton: 'react-search-bar__submit',
//     suggestions: 'react-search-bar__suggestions',
//     suggestion: 'react-search-bar__suggestion'
//   },
//   suggestionRenderer: suggestion => <div>{suggestion}</div>
// };

export default SearchBar;
