import React from 'react'

export class SelectImportFile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoading: false
        }
    }

    onClick = () => this.setState(() => ({showLoading: true}))

    render() {
        return (
            <form>
                <p>{this.props.message}</p>
                <input type='file' accept='.csv' onChange={this.props.handleOnChange} onClick={this.onClick} />
                {this.state.showLoading && <div><h3>Loading...</h3></div>}
            </form>
        )
    }
}

export default SelectImportFile