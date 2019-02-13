import React from 'react';
import { connect } from 'react-redux';
import AutoComplete from './autoComplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchProveedores, setSelectedProveedor, setAppPagination } from '../../actions';

class ProveedoresSelector extends React.Component {

  componentDidMount = () => {
    this.props.setSelectedProveedor();
    this.props.setAppPagination({ page:0, pageSize:5 });
  };

  getSuggestionValue = (row) => {
    this.props.setSelectedProveedor(row);
    return row.empresa;
  };

  renderSuggestion = (row, { query, isHighlighted }) => {
    const matches = match(row.empresa, query);
    const parts = parse(row.empresa, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            ),
          )}
        </div>
      </MenuItem>
    );
  };

  getSuggestions = (value) => {
    const inputValue = value.trim();
    const inputLength = inputValue.length;

    const { page, pageSize } = this.props.pagination;
    this.props.fetchProveedores(page, pageSize, inputValue);
    return inputLength === 0 ? [] : this.props.rows;
  };

  handleChange = (newValue, suggestions) => {
    if (!newValue) {
      return this.props.setSelectedProveedor();
    }

    if (suggestions.filter(it => it.empresa === newValue).length === 0) {
      return this.props.setSelectedProveedor();
    }
  };

  render() {
    return (
        <AutoComplete label="Proveedor" placeholder="Escriba el nombre"
          getSuggestions={this.getSuggestions}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          handleChange={this.handleChange}
         />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.proveedores.selected,
    rows: state.proveedores.rows || [],
    totalRows: state.proveedores.totalRows || 0,
    pagination: state.app.pagination
  };
}

ProveedoresSelector = connect(mapStateToProps, {
  fetchProveedores,
  setSelectedProveedor,
  setAppPagination
}) (ProveedoresSelector);

export default ProveedoresSelector;
