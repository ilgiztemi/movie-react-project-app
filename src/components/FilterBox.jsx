import React, {Component} from "react";

class FilterBox extends Component {
    render() {
        return (
            <div>
                <select onChange={(event) => this.props.setFilterValue(event.target.value)} className="form-control mb-3 mt-1">
                    <option defaultValue={''}>Choose type</option>
                    <option value='movie'>Movie</option>
                    <option value="series">Series</option>
                    <option value="episodes">Episodes</option>
                </select>
            </div>
        )
    }
}
export default FilterBox;