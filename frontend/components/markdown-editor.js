import React from 'react'
import PropTypes from 'prop-types'
import RichTextEditor from 'react-rte'

export default class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: RichTextEditor.createValueFromString(props.value, 'markdown'),
    }
  }

  onChange = value => {
    this.setState({ value })
    this.props.textarea.value = value.toString('markdown')
  }

  render() {
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: [
        'INLINE_STYLE_BUTTONS',
        'BLOCK_TYPE_BUTTONS',
        'LINK_BUTTONS',
        'BLOCK_TYPE_DROPDOWN',
        'HISTORY_BUTTONS',
      ],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading 1', style: 'header-one' },
        { label: 'Heading 2', style: 'header-two' },
        { label: 'Heading 3', style: 'header-three' },
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
      ],
    }
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        toolbarConfig={toolbarConfig}
      />
    )
  }
}

MarkdownEditor.propTypes = {
  onChange: PropTypes.func,
  textarea: PropTypes.object.isRequired,
}
