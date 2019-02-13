import React from 'react';
import { connect } from 'react-redux';
import AutoComplete from './autoComplete';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchMateriales, setSelectedMaterial, setAppPagination } from '../../actions';

class MaterialesSelector extends React.Component {

  getComposedName = (row) => {
    return `${row.nombre || ""} ${row.color || ""} ${row.unidad || ""} ${row.marca || ""} ${row.modelo || ""}`
  }

  componentDidMount = () => {
    this.props.setSelectedMaterial(-1);
    this.props.setAppPagination({ page:0, pageSize:5 });
  };

  getSuggestionValue = (row) => {
    this.props.setSelectedMaterial(row.idMaterial);
    return this.getComposedName(row);
  };

  renderSuggestion = (row, { query, isHighlighted }) => {
    const matches = match(this.getComposedName(row), query);
    const parts = parse(this.getComposedName(row), matches);

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
    this.props.fetchMateriales(page, pageSize, inputValue);
    return inputLength === 0 ? [] : this.props.rows;
  };

  handleChange = (newValue, suggestions) => {
    if (!newValue) {
      return this.props.setSelectedMaterial(-1);
    }

    if (suggestions.filter(it => this.getComposedName(it) === newValue).length === 0) {
      return this.props.setSelectedMaterial(-1);
    }
  };

  render() {
    return (
        <AutoComplete label="Material" placeholder="Escriba el nombre"
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
    selectedId: state.materiales.selectedId,
    rows: state.materiales.rows || [],
    totalRows: state.materiales.totalRows || 0,
    pagination: state.app.pagination
  };
}

MaterialesSelector = connect(mapStateToProps, {
  fetchMateriales,
  setSelectedMaterial,
  setAppPagination
}) (MaterialesSelector);

export default MaterialesSelector;
