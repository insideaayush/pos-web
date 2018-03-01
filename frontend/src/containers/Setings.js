import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        flexGrow:1
    }
})
class Settings extends React.Component{
    render(){
        const {classes} = this.props
        return (
            <div className={classes.root} >
                hello world
            </div>
        )
    }
}

export default connect(null,null)(withStyles(styles, {withTheme: true})(Settings))