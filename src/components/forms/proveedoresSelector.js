import React from 'react';
import { connect } from 'react-redux';
import AutoComplete from './autoComplete';
import deburr from 'lodash/deburr';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchProveedores, setSelectedProveedor, setAppPagination } from '../../actions';

class ProveedoresSelector extends React.Component {

  componentDidMount = () => {
    this.props.setSelectedProveedor(-1);
    this.props.setAppPagination({ page:0, pageSize:5 });
  }

  getSuggestionValue = (row) => {
    this.props.setSelectedProveedor(row.idProveedor);
    return row.empresa;
  }

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
  }

  getSuggestions = (value) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    const { page, pageSize } = this.props.pagination;
    this.props.fetchProveedores(page, pageSize, value);

    return inputLength === 0
      ? []
      : this.props.rows.filter(row => {
          const keep =
            count < 5 && row.empresa.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  }

  render() {
    return (
      <div>
        <AutoComplete label="Proveedor" placeholder="Escriba el nombre"
        getSuggestions={this.getSuggestions}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedId: state.proveedores.selectedId,
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
