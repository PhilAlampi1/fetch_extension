import React from 'react'

export class SelectImportFile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLoading: false
        }
    }

    onClick = () => this.setState(() => ({ showLoading: true }))

    render() {
        return (
            <div className="container__centerify">
                <form className="container__child">
                    <p className="narrative-text">{this.props.message}</p>
                    <input type='file' accept='.csv' onChange={this.props.handleOnChange} onClick={this.onClick} />
                    {this.state.showLoading && <div><h3>Loading...</h3></div>}
                </form>
            </div>
        )
    }
}

export default SelectImportFile